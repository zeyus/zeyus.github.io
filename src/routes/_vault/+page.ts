import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = () => {
    const vaultHome: VaultPageProps = {
        title: "Welcome to the vault",
        date: new Date('2025-01-08'),
    };
    return {
        props: vaultHome
    };
};
