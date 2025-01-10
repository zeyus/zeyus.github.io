import type { PageLoad } from './$types';

export const load: PageLoad = () => {
    return {
        props: {
            title: 'terminal',
            excerpt: 'A working web-based serial terminal that can be used to interact with a microcontroller or any other serial devices connected to your PC. Right from your browser!',
        }
    }
};
