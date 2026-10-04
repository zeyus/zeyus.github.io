import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const riseTogether: VaultPageProps = {
		// TODO: the title leads with jargon and the excerpt says nothing specific; both are what gets
		// shared. Two options:
		//   'Is a team more than six people in a room? Building a group brain-imaging experiment'
		//   'Rise Together: a multiplayer game for recording six brains at once, built with Flutter'
		title: 'My PhD Project: EEG Hyperscanning, Videogames, Cooperation and Competition',
		date: new Date('2026-09-10'),
		excerpt:
			'It is complex, it is fun and challenging, and I hope that we can push the field towards more naturalistic experiments.',
		short_title: 'PhD Project',
		draft: true,
		feature_image: {
			src: 'lab-setup.jpg',
			alt: 'Six seats arranged in a circle, each with an iPad on a stand and a mannequin head wearing an EEG cap, around a central equipment table',
			title:
				'The experimental setup in the lab, sans humans. These participants are quite patient but give terrible quality data.'
		}
	};
	return {
		props: riseTogether
	};
};
