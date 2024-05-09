import { createLocalStorage, persist } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

/**
 * ### 필터링할 키워드
 */
export const filter_keywords = persist(
	writable<string[]>([]),
	createLocalStorage(),
	'filter-keywords'
);
