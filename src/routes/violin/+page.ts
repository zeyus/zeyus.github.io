import type { PageLoad } from './$types';

export const load: PageLoad = () => {
    return {
        props: {
            title: 'violin beginner resources',
            excerpt: 'Some basics for learning violin.',
        }
    }
};