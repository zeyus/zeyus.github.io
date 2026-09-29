import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const certRenewal: VaultPageProps = {
		title: 'My PhD Project: EEG Hyperscanning, Videogames, Cooperation and Competition',
		date: new Date('2026-09-10'),
		excerpt:
			'It is complex, it is fun and challenging, and I hope that we can push the field towards more naturalistic experiments.',
		short_title: 'PhD Project',
		draft: true
	};
	return {
		props: certRenewal
	};
};
