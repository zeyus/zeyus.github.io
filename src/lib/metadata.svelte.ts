export interface Metadata {
    title?: string;
    date?: Date;
    description?: string;
    ogImage?: string;
}

export interface MetadataContext {
    setMetadata: (metadata: Metadata) => void;
    title: (suffix?: boolean) => string;
    date: () => string;
    description: () => string;
    ogImage: () => string;

}


export const createMetadataContext = (metaCtx: Map<string, string> | undefined = new Map<string, string>(), opts?: { defaultMeta?: Metadata, titleSuffix?: string }): MetadataContext => {
    function cleanUp() {
        return () => {
            metaCtx.delete('title');
            metaCtx.delete('date');
            metaCtx.delete('description');
            metaCtx.delete('og:image');
        };
    }

    $effect(() => {
        if (opts?.defaultMeta) {
            metaCtx.set('title', opts.defaultMeta.title || '');
            metaCtx.set('date', opts.defaultMeta.date?.toISOString() || '');
            metaCtx.set('description', opts.defaultMeta.description || '');
            metaCtx.set('og:image', opts.defaultMeta.ogImage || '');
        }
        return cleanUp;
    });

    return {
        setMetadata: (metadata: Metadata): void => {
            $effect(() => {
                if (metadata.title) {
                    metaCtx.set('title', metadata.title);
                } else if (opts?.defaultMeta?.title) {
                    metaCtx.set('title', opts.defaultMeta.title);
                }
                if (metadata.date) {
                    metaCtx.set('date', metadata.date.toISOString());
                } else if (opts?.defaultMeta?.date) {
                    metaCtx.set('date', opts.defaultMeta.date.toISOString());
                }
                if (metadata.description) {
                    metaCtx.set('description', metadata.description);
                } else if (opts?.defaultMeta?.description) {
                    metaCtx.set('description', opts.defaultMeta.description);
                }
                if (metadata.ogImage) {
                    metaCtx.set('og:image', metadata.ogImage);
                } else if (opts?.defaultMeta?.ogImage) {
                    metaCtx.set('og:image', opts.defaultMeta.ogImage);
                }
                return cleanUp;
            });
        },
        title: (suffix: boolean | undefined = true) => {
            if (metaCtx.get('title')) {
                return metaCtx.get('title') + (suffix && opts?.titleSuffix ? ` ${opts.titleSuffix}` : '');
            }
            if (opts?.defaultMeta?.title) {
                return opts.defaultMeta.title + (suffix && opts?.titleSuffix ? ` ${opts.titleSuffix}` : '');
            }
            return '';
        },
        date: () => {
            if (metaCtx.get('date')) {
                return new Date(metaCtx.get('date') || '').toISOString();
            }
            if (opts?.defaultMeta?.date) {
                return opts.defaultMeta.date.toISOString();
            }
            return '';
        },
        description: () => {
            if (metaCtx.get('description')) {
                return metaCtx.get('description') || '';
            }
            if (opts?.defaultMeta?.description) {
                return opts.defaultMeta.description;
            }
            return '';
        },
        ogImage: () => {
            if (metaCtx.get('og:image')) {
                return metaCtx.get('og:image') || '';
            }
            if (opts?.defaultMeta?.ogImage) {
                return opts.defaultMeta.ogImage;
            }
            return '';
        }
    };
}
