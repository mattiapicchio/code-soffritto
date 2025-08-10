import { signal } from '@preact/signals-react';

export const theme = signal<'dark' | 'light'>('dark');

export const toggleTheme = () => {
	theme.value = theme.value === 'dark' ? 'light' : 'dark';
};
