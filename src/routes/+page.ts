import type { PageLoad } from './$types';

export const load: PageLoad = () => {
    return {
        props: {
            title: 'home',
            excerpt: 'Hi, I\'m zeyus, the epitome of a generalist. I left industry to study cognitive science and now I\'m working on my PhD so I can specialize in generalism.',
        }
    }
};
