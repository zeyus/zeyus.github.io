import type { PageLoad } from './$types';

export const load: PageLoad = () => {
    
    const esp32FluidSim: VaultPageProps = {
        title: "ESP32 particle fluid simulation",
        date: new Date('2025-04-10'),
        excerpt: "A write-up about my project to make a battery-powered ESP32 particle fluid simulation.",
        short_title: "ESP32 fluid sim",
    };
    return {
        props: esp32FluidSim
    };
};
