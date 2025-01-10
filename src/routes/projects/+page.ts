import type { PageLoad } from './$types';

export const load: PageLoad = () => {
    return {
        props: {
            title: 'projects',
            excerpt: 'A selection of projects that I have worked on, from apps to research, all open source!',
        }
    }
};
