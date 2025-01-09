import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

// change to global reactivity

export const defaultImage = '/images/zeyusdotcom@3x.png';
export const defaultDescription = 'zeyus dot com official website';

export let title: Writable<string> = writable('zeyus dot com');
export let ogImage: Writable<string> = writable(defaultImage);
export let pageDescription: Writable<string> = writable(defaultDescription);
