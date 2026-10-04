import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const certRenewal: VaultPageProps = {
		title: 'Using cerbot letsencrypt certificate auto-renewal in non-root apps',
		date: new Date('2026-05-16'),
		excerpt:
			"How to set up automatic certificate renewal for a non-root application using certbot and Let's Encrypt.",
		short_title: 'Non-root cert renewal'
	};
	return {
		props: certRenewal
	};
};
