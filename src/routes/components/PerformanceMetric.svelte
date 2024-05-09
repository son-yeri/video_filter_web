<script lang="ts">
	import type { PerformanceMetric } from '$lib/performance_metric_type';

	export let metric: Pick<PerformanceMetric, 'search_time' | 'filter_time' | 'all' | 'filtered'>;
</script>

<div class="flex flex-col gap-4 border-2 border-black p-4 text-center">
	<span class="text-xl font-bold"
		>총 {(metric.all ?? []).length}개의 영상 중 {(metric.filtered ?? []).length}개 필터링됨</span
	>
	<span class="text-xl font-bold">검색 소요 시간: {metric.search_time} ms</span>
	<span class="text-xl font-bold">필터 소요 시간: {metric.filter_time} ms</span>
</div>
