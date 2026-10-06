import { dev } from '$app/env';
import { sortPosts } from '#lib/utils.ts';

const loadAllVaultEntries = async (): Promise<App.VaultEntries[]> => {
	const vaultEntries: App.VaultEntries[] = [];
	// only `load` is imported: pulling in the whole module namespace makes the bundler add an
	// extra export to each +page.ts chunk, which SvelteKit rejects as an invalid export
	const vaultLoaders = import.meta.glob<App.VaultPageModule['load']>(
		'/src/routes/_vault/*/+page.ts',
		{ eager: true, import: 'load' }
	);
	for (const path in vaultLoaders) {
		const entry = await vaultLoaders[path]();
		const name = path.split('/').slice(-2)[0];
		vaultEntries.push({
			path: '/_vault/' + name + '/',
			props: entry.props
		});
	}

	return vaultEntries;
};

/**
 * Drafts (props.draft === true) are visible in dev, but hidden from
 * production builds (post lists, ticker, and the page itself 404s).
 */
const isPublished = (entry: App.VaultEntries): boolean => dev || !entry.props.draft;

/**
 * Load every published _vault post entry, sorted.
 * Shared by the _vault layout (sidebar + post list) and anything else that
 * wants the post list, e.g. the ticker on the home page.
 */
export const loadVaultEntries = async (): Promise<App.VaultEntries[]> => {
	return (await loadAllVaultEntries()).filter(isPublished).sort(sortPosts);
};

/**
 * True if the given pathname is a _vault post that should not be published.
 */
export const isUnpublishedVaultPath = async (pathname: string): Promise<boolean> => {
	const normalised = pathname.endsWith('/') ? pathname : pathname + '/';
	return (await loadAllVaultEntries()).some(
		(entry) => entry.path === normalised && !isPublished(entry)
	);
};
