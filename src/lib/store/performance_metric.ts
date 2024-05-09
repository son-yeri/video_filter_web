import type { PerformanceMetric } from '$lib/performance_metric_type';
import { createIndexedDBStorage, persist } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

/**
 * 성능 로그 정보
 */
export const performanceMetric = persist(
	writable<PerformanceMetric[]>([]),
	createIndexedDBStorage(),
	'performance-metric-cache'
);
