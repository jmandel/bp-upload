import { writable } from 'svelte/store';

const initialData = [];

export const bpStore = writable(initialData);
