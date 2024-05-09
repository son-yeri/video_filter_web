import type { PerformanceMetric } from '$lib/performance_metric_type';
import { createIndexedDBStorage, persist } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

/**
 * 성능 로그 정보
 */
export const performanceMetric = persist(
	writable<PerformanceMetric[]>([
		{
			all: [],
			filtered: [],
			date: new Date().toISOString(),

			filter_keywords: ['사과', '탕후루'],
			search_keyword: '귤 탕후루',

			filter_time: 100,
			search_time: 30,
			request_id: '1'
		}
	]),
	createIndexedDBStorage(),
	'performance-metric-cache'
);
