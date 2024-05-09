import type { Result } from '$lib/result_type';
import { writable } from 'svelte/store';

/** 검색 중 여부 */
export const searching = writable(false);
/** 검색 횟수 */
export const search_count = writable(0);

/** 검색 결과 */
export const result_list = writable<Result[]>([]);

/**
 * 검색 함수
 * @param keyword 검색 키워드
 * @returns
 */
export const search = async (keyword: string) => {
	searching.set(true);

	/** 검색 시작 시간 (단위: 밀리 초) */
	const search_start = performance.now();

	// TODO: 검색 로직은 여기에, 검색 결과를 result_list에 저장해야 함

	result_list.set([
		{
			title: '사과',
			description: '설명',
			hashes: ['사과'],
			thumbnail: 'https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg',
			video_id: '',
			video_url: ''
		},
		{
			title: '사과',
			description: '설명',
			hashes: ['사과'],
			thumbnail: 'https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg',
			video_id: '',
			video_url: ''
		},
		{
			title: '사과',
			description: '설명',
			hashes: ['사과'],
			thumbnail: 'https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg',
			video_id: '',
			video_url: ''
		}
	]);

	/** 검색 종료 시간 (단위: 밀리 초) */
	const search_end = performance.now();

	setTimeout(() => {
		searching.set(false);
		search_count.update((count) => count + 1);
	}, 1000);

	return {
		/** 검색 소요 시간 (단위: 밀리 초) */
		elapsed_time: search_end - search_start
	};
};
