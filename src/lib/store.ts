import { browser } from '$app/environment';
import type { Writable } from 'svelte/store';
import { writable, get } from 'svelte/store';

const storage = <T>(key: string, initValue: T): Writable<T> => {
    const store = writable(initValue);
    if (!browser) return store;

    const storedValueStr = localStorage.getItem(key);
    if (storedValueStr != null) {
        try {
            store.set(JSON.parse(storedValueStr));
        } catch (e) {
            console.error('Failed to parse stored value:', e);
        }
    }

    let lastSavedValue = JSON.stringify(get(store));

    store.subscribe((val) => {
        if (val === null || val === undefined) {
            localStorage.removeItem(key);
            lastSavedValue = '';
        } else {
            const serialized = JSON.stringify(val);
            if (serialized !== lastSavedValue) {
                localStorage.setItem(key, serialized);
                lastSavedValue = serialized;
            }
        }
    });

    window.addEventListener('storage', (e) => {
        if (e.key !== key) return;
        const storedValueStr = e.newValue;
        if (storedValueStr == null) return;

        if (storedValueStr !== lastSavedValue) {
            try {
                const localValue: T = JSON.parse(storedValueStr);
                lastSavedValue = storedValueStr;
                store.set(localValue);
            } catch (error) {
                console.error('Failed to parse storage event:', error);
            }
        }
    });

    return store;
};

export default storage;
