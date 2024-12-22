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

	interface Footnote {
		text: string;
		url: string;
		year?: number;

	};

	type CommonBibTeXFields = {
		author?: string;
		title?: string;
		year?: string;
		journal?: string;
		volume?: string;
		number?: string;
		pages?: string;
		publisher?: string;
		editor?: string;
		series?: string;
		address?: string;
		edition?: string;
		month?: string;
		note?: string;
		doi?: string;
		url?: string;
		[key: string]: string | undefined; // To support additional fields
	};
	  
	type BibTeXEntry = {
		entryType: string; // e.g., "article", "book", etc.
		citationKey: string; // Unique identifier for the entry
		fields: CommonBibTeXFields;
	};
}

export {};
