// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { HTMLImgAttributes } from 'svelte/elements';

declare global {
	namespace App {
		
	};
	interface VaultGallery {
		id?: string;
		name?: string;
		position?: "start" | "end" | "none";
		images: HTMLImgAttributes[];
	};
	interface VaultPageProps {
		title: string;
		date: string;
		feature_image?: HTMLImgAttributes;
		gallery?: VaultGallery;
	};
}

export {};
