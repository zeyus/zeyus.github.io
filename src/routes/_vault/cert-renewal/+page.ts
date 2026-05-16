import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const certRenewal: VaultPageProps = {
		title: 'Using cerbot letsencrypt certificate auto-renewal in non-root apps',
		date: new Date('2026-05-16'),
		excerpt:
			'A write-up about my project to make a battery-powered ESP32 particle fluid simulation.',
		short_title: 'Non-root cert renewal'
	};
	return {
		props: certRenewal
	};
};
