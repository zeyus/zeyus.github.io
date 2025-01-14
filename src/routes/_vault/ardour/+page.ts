import type { PageLoad } from './$types';

export const load: PageLoad = () => {
    
    const ardourBuild: VaultPageProps = {
        title: "Building Ardour on OSX 15.3 for an M3 MacBook Pro",
        date: new Date('2025-01-13'),
        excerpt: "A rough guide to build and install Ardour on OSX",
        short_title: "OSX Ardour Build",
    };
    return {
        props: ardourBuild
    };
};
