import { findInSet, indexOfSet, filterSet } from "./utils";

export interface FootnotesContext {
    addFootnote: (fn: Footnote) => void;
    getFootnotes: () => () => Set<Footnote>;
    hasFootnote: (fn: Footnote | undefined) => () => boolean;
    findFootnote: (text: string, path?: () => string) => () => Footnote | undefined;
    incrementFootnote: (fn: Footnote) => () => void;
    indexOf: (fn?: Footnote) => () => number;
    filter: (test: (o: Footnote) => boolean) => () => Array<Footnote>;
}


export const createFootnotesContext = (items: Set<Footnote> | undefined = new Set<Footnote>()): FootnotesContext => {
    return {
        addFootnote: (fn: Footnote): void => {
            $effect(() => {
                items.add(fn);
                return () => items.delete(fn);
            });
        },

        getFootnotes: (): () => Set<Footnote> => { return () => items; },


        hasFootnote: (fn: Footnote | undefined) => {
            return () => typeof fn === 'undefined' ? false : items.has(fn);
        },

        findFootnote: (text: string, url?: () => string): () => Footnote | undefined => {
            return () => findInSet(items, (o: Footnote) => o.text === text && (typeof url === 'undefined' ? true : o.url === url()));
        },

        incrementFootnote: (which: Footnote): () => void => {
            return () => {
                let fn = findInSet(items, (o: Footnote) => o.text === which.text && o.url === which.url);
                if (fn) fn.occurrences++;
            };
        },

        indexOf: (fn?: Footnote) => {
            return () => typeof fn === 'undefined' ? -1 : indexOfSet(items, fn);
        },

        filter: (test: (o: Footnote) => boolean): () => Array<Footnote> => {
            return () => filterSet(items, test);
        }
    };
}
