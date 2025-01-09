import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = () => {
    const vaultHome: VaultPageProps = {
        title: "Welcome to the vault",
        date: new Date('2025-01-08'),
        excerpt: "The vault is a place where I write about things, it's not really a blog, and it's not really documentation, but maybe there's something interesting for you.",
    };
    return {
        props: vaultHome
    };
};
