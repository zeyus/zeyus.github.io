import type { LayoutLoad } from './$types';
import { loadVaultEntries } from '$lib/vault.ts';

export const load: LayoutLoad = async () => {
	return {
		posts: await loadVaultEntries()
	};
};
