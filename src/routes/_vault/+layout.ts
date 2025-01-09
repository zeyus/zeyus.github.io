import type { LayoutLoad } from './$types';

export const ssr = false;
export const prerender = true;

export const load: LayoutLoad = async () => {
    let vaultEntries: App.VaultEntries[] = [];
    const vaultPages: Record<string, App.VaultPageModule> = import.meta.glob("./*/+page.ts", { eager: true });
    for (const path in vaultPages) {
        const entry = await vaultPages[path].load();
        const name = path.split('/').slice(-2)[0];
        const cleanPath = '/_vault/' + name;
        vaultEntries.push({
            path: cleanPath,
            props: entry.props
        });

    }

    return {
        entries: vaultEntries
    } 
};
