import { sortPosts } from '$lib/utils.ts';

/**
 * Load every _vault post entry, sorted.
 * Shared by the _vault layout (sidebar + post list) and anything else that
 * wants the post list, e.g. the ticker on the home page.
 */
export const loadVaultEntries = async (): Promise<App.VaultEntries[]> => {
	const vaultEntries: App.VaultEntries[] = [];
	const vaultPages: Record<string, App.VaultPageModule> = import.meta.glob(
		'/src/routes/_vault/*/+page.ts',
		{ eager: true }
	);
	for (const path in vaultPages) {
		const entry = await vaultPages[path].load();
		const name = path.split('/').slice(-2)[0];
		vaultEntries.push({
			path: '/_vault/' + name + '/',
			props: entry.props
		});
	}

	return vaultEntries.sort(sortPosts);
};
