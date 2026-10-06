import type { LayoutLoad } from './$types';
import { error } from '@sveltejs/kit';
import { isUnpublishedVaultPath, loadVaultEntries } from '#lib/vault.ts';

export const load: LayoutLoad = async ({ url }) => {
	if (await isUnpublishedVaultPath(url.pathname)) {
		error(404, 'Not found');
	}
	return {
		posts: await loadVaultEntries()
	};
};
