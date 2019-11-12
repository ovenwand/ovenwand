import { writable } from 'svelte/store';
import logoMarkup from '@/../static/images/logo.svg';

export const name = writable('Ovenwand');

export const logo = writable(logoMarkup);