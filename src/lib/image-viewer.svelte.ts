import { getContext, setContext } from 'svelte';

/** One enlargeable image in the current post, registered by EnhancedImg. */
export interface ViewerImage {
	src: string;
	srcset?: string;
	/** natural size, when the image manifest knows it */
	width?: number;
	height?: number;
	alt: string;
	title?: string;
	/** extra classes the image carries in the page (e.g. invert-90), kept when enlarged */
	extraClass?: string;
	/** the image as shown in the page, to animate from and to */
	thumb: () => HTMLImageElement | undefined;
}

/**
 * The images of the post being read, and which one (if any) is open in ImageViewer.
 * Created by the vault layout; EnhancedImg registers its image when it mounts.
 */
export class ImageViewerState {
	// raw: entries are compared by identity, which a deep $state proxy would break
	#images = $state.raw<ViewerImage[]>([]);
	current = $state.raw<ViewerImage | null>(null);
	/** opened by hovering, so leaving the enlarged image should close it again */
	byHover = $state(false);

	register(image: ViewerImage) {
		this.#images = [...this.#images, image];
		return () => {
			this.#images = this.#images.filter((i) => i !== image);
			if (this.current === image) this.current = null;
		};
	}

	/** in page order, which isn't necessarily the order they mounted in */
	get images() {
		return [...this.#images].sort((a, b) => {
			const ta = a.thumb();
			const tb = b.thumb();
			if (!ta || !tb) return 0;
			return ta.compareDocumentPosition(tb) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
		});
	}

	get index() {
		return this.current ? this.images.indexOf(this.current) : -1;
	}

	open(image: ViewerImage, byHover = false) {
		this.byHover = byHover;
		this.current = image;
	}

	close() {
		this.current = null;
	}

	/** wraps around at either end */
	step(by: number) {
		const images = this.images;
		if (!this.current || images.length < 2) return;
		const i = images.indexOf(this.current);
		this.byHover = false;
		this.current = images[(i + by + images.length) % images.length];
	}
}

const KEY = Symbol('image-viewer');

export const setImageViewer = (viewer: ImageViewerState) => setContext(KEY, viewer);
export const getImageViewer = () => getContext<ImageViewerState | undefined>(KEY);
