<script>
	import { page } from '$app/stores';
    // @ts-ignore
    import { title } from "$lib/store.ts";

    import { generateMenu } from '$lib/menu.ts';
    const modules = import.meta.glob('./**/+page.svelte');
    let menuItems = [];
    for (const path in modules) {
        const name = path.split('/').slice(-2)[0];
        const cleanName = name === '.' ? 'home' : name;
        const cleanPath = '/' + (name === '.' ? '' : name);
        menuItems.push({
            name: cleanName,
            path: cleanPath
        });
    }
    const nav = generateMenu(menuItems, $page.url.pathname);
</script>
<svelte:head>
	<title>{$title} - zeyus dot com</title>
</svelte:head>
{@html nav.innerHTML}
<h1>{$title}</h1>
<!-- <nav>
	<a href="/" aria-current={$page.url.pathname === '/'}>
		home
	</a>

	<a href="/music" aria-current={$page.url.pathname === '/music'}>
		music
	</a>
</nav> -->
<slot />