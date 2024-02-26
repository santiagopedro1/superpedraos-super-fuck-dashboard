import { writable, type Writable } from 'svelte/store';

export const mostrarValores: Writable<boolean> = writable(true);
