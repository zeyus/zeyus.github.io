// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { HTMLImgAttributes } from 'svelte/elements';

declare global {
	namespace App {
		interface VaultPageModule {
			load: () => Promise<{
				props: VaultPageProps;
			}>;
		}
		interface VaultEntries {
			path: string;
			props: VaultPageProps;
		}
	};
	interface VaultGallery {
		id?: string;
		name?: string;
		position?: "start" | "end" | "none";
		images: HTMLImgAttributes[];
	};
	interface VaultPageProps {
		title: string;
		date: Date;
		excerpt?: string;
		short_title?: string;
		feature_image?: HTMLImgAttributes;
		gallery?: VaultGallery;
	};

	interface Footnote {
		text: string;
		url: string;
		year?: number;
		occurrences: number;
		addOccurrence: () => void;
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

	namespace Navigator {
		type USB = {
			getDevices: () => Promise<USBDevice[]>;
			requestDevice: (options: USBDeviceRequestOptions) => Promise<USBDevice>;
		}
		type Serial = {
			getPorts: () => Promise<SerialPort[]>;
			requestPort: () => Promise<SerialPort>;
		}
	}
}

export {};
