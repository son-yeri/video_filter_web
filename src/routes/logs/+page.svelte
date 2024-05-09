<script lang="ts">
	import { performanceMetric } from '$lib/store/performance_metric';
	import { goto } from '$app/navigation';
	import Button from '../components/Button.svelte';

	const row_titles = [
		'숫자',
		'기록 일자',
		'요청 ID',
		'검색어',
		'필터링 키워드',
		'필터링된 영상 수',
		'총 소요 시간',
		'상세 보기'
	];

	let columns: (string | number)[][];

	$: {
		columns = $performanceMetric.map((metric, index) => {
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
		});
	}
</script>

<div class="overflow-x-auto">
	<table class="table">
		<thead>
			<tr>
				{#each row_titles as title}
					<th>{title}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each columns as column}
				<tr>
					{#each column as cell}
						<td>{cell}</td>
					{/each}
					<td>
						<Button
							on:click={async () => {
								await goto(`/logs/detail?id=${column[2]}`);
							}}>상세 보기</Button
						>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
