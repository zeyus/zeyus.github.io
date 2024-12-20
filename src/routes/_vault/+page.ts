import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = () => {
    const vaultHome: VaultPageProps = {
        title: "Welcome to the vault",
        date: "2024-12-10",
    };
    return {
        props: vaultHome
    };
};
