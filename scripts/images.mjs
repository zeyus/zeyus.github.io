/**
 * Generates responsive AVIF variants for every image under static/_assets/images
 * and writes src/lib/image-manifest.json, which EnhancedImg uses to build a srcset.
 *
 * Run with `pnpm run images` after adding or changing an image. Variants that are
 * already up to date are skipped, variants whose source is gone are removed.
 *
 *   static/_assets/images/_vault/sauna/02.jpg            (original, the fallback)
 *   static/_assets/images/_vault/sauna/_r/02-480.avif    (generated)
 *   static/_assets/images/_vault/sauna/_r/02-1440.avif   (generated, full size)
 */
import { mkdir, open, readdir, rm, stat, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const staticDir = path.join(root, 'static');
const imageDir = path.join(staticDir, '_assets', 'images');
const manifestPath = path.join(root, 'src', 'lib', 'image-manifest.json');

const VARIANT_DIR = '_r';
const SOURCES = /\.(jpe?g|png|webp)$/i;
// the original width is always added as the largest variant
const WIDTHS = [480, 768, 1080, 1600, 2400];
// a smaller variant is only worth it if it's meaningfully narrower than the next one up
const MIN_STEP = 1.2;

/** photos tolerate chroma subsampling, flat graphics (screenshots, diagrams) don't */
const encoding = (lossless) =>
	lossless
		? { quality: 80, chromaSubsampling: '4:4:4' }
		: { quality: 68, chromaSubsampling: '4:2:0' };

async function* walk(dir) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			if (entry.name !== VARIANT_DIR) yield* walk(full);
		} else if (SOURCES.test(entry.name)) {
			yield full;
		}
	}
}

const mtime = (file) =>
	stat(file).then(
		(s) => s.mtimeMs,
		() => 0
	);

async function isLossless(file, meta) {
	if (meta.format === 'png') return true;
	if (meta.format !== 'webp') return false;
	// lossy WebP stores its pixels in a "VP8 " chunk, lossless in "VP8L"
	const handle = await open(file);
	const { buffer } = await handle.read(Buffer.alloc(64), 0, 64, 0);
	await handle.close();
	return buffer.includes('VP8L');
}

const manifest = {};
const wanted = new Set();
let written = 0;

async function generate(file) {
	const meta = await sharp(file).metadata();
	// EXIF orientations 5-8 swap the axes
	const rotated = (meta.orientation ?? 1) >= 5;
	const width = rotated ? meta.height : meta.width;
	const height = rotated ? meta.width : meta.height;

	const widths = WIDTHS.filter((w) => w * MIN_STEP <= width).concat(width);
	const outDir = path.join(path.dirname(file), VARIANT_DIR);
	const base = path.basename(file, path.extname(file));
	const sourceTime = await mtime(file);
	const options = encoding(await isLossless(file, meta));
	const sourceSize = (await stat(file)).size;

	const kept = [];
	for (const w of widths) {
		const out = path.join(outDir, `${base}-${w}.avif`);
		if ((await mtime(out)) < sourceTime) {
			await mkdir(outDir, { recursive: true });
			await sharp(file)
				.rotate()
				.resize({ width: w, withoutEnlargement: true })
				// keep wide-gamut (e.g. Display P3) sources wide-gamut instead of clipping to sRGB
				.keepIccProfile()
				.avif(options)
				.toFile(out);
			written++;
		}
		// a full-size re-encode that isn't smaller than the original is pointless
		if (w === width && (await stat(out)).size >= sourceSize) {
			await rm(out);
			continue;
		}
		wanted.add(out);
		kept.push(w);
	}

	const url = '/' + path.relative(staticDir, file).split(path.sep).join('/');
	manifest[url] = { width, height, widths: kept };
}

const files = [];
for await (const file of walk(imageDir)) files.push(file);
// each encode is already multi-threaded, so only a few at a time
const workers = Array.from(
	{ length: Math.max(1, Math.floor(os.availableParallelism() / 2)) },
	async () => {
		for (let file; (file = files.pop());) await generate(file);
	}
);
await Promise.all(workers);

// drop variants left behind by deleted or renamed sources
let removed = 0;
async function prune(dir) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (!entry.isDirectory()) continue;
		if (entry.name !== VARIANT_DIR) {
			await prune(full);
			continue;
		}
		for (const name of await readdir(full)) {
			if (!wanted.has(path.join(full, name))) {
				await rm(path.join(full, name));
				removed++;
			}
		}
		if ((await readdir(full)).length === 0) await rm(full, { recursive: true });
	}
}
await prune(imageDir);

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(manifestPath, JSON.stringify(sorted, null, '\t') + '\n');

console.log(
	`${Object.keys(manifest).length} images, ${wanted.size} variants (${written} written, ${removed} removed)`
);
