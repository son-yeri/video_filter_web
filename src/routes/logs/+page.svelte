<script lang="ts">
	import { performanceMetric } from '$lib/store/performance_metric';
	import Table from '../components/Table.svelte';
</script>

<Table
	row_titles={[
		'숫자',
		'기록 일자',
		'요청 ID',
		'검색어',
		'필터링 키워드',
		'필터링된 영상 수',
		'총 소요 시간'
	]}
	columns={$performanceMetric.map((metric, index) => {
		const {
			request_id,
			search_keyword,
			date,
			filter_keywords,
			filtered,
			all,
			filter_time,
			search_time
		} = metric;
		const total_time = filter_time + search_time;

		return [
			index + 1,
			date,
			request_id,
			search_keyword,
			filter_keywords.map((keyword) => `"${keyword}"`).join(', '),
			`${(filtered ?? []).length}/${(all ?? []).length}`,
			total_time
		];
	})}
></Table>
