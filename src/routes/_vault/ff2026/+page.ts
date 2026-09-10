import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const certRenewal: VaultPageProps = {
		title: 'My experience as a researcher at Flutter & Friends 2026',
		date: new Date('2026-09-10'),
		excerpt:
			'Just some notes on my experience at a conference for Flutter developers from the perspective of someone who is no longer in industry.',
		short_title: 'Flutter & Friends 2026'
	};
	return {
		props: certRenewal
	};
};
