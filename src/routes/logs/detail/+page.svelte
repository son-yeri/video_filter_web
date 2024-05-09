<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { performanceMetric } from '$lib/store/performance_metric';
	import type { PerformanceMetric as IPerformanceMetric } from '$lib/performance_metric_type';

	import ResponsiveCard from '../../components/ResponsiveCard.svelte';
	import Table from '../../components/Table.svelte';

	let log_id: string = '';
	let target_metrics: IPerformanceMetric[] = [];

	$: {
		target_metrics = $performanceMetric.filter((metric) => metric.request_id === log_id);
		console.log(target_metrics);
	}

	onMount(function () {
		const params = $page.url.searchParams;
		log_id = params.get('id') ?? '';
	});
</script>

{#if target_metrics.length === 0}
	<p>결과를 찾지 못함</p>
{:else}
	{@const metric = target_metrics[0]}
	<Table
		row_titles={[
			'요청 ID',
			'기록 날짜',
			'검색/필터링/총 소요 시간 (단위: ms)',
			'검색된 영상 수',
			'필터링 된 영상 수',
			'설정된 필터링 단어',
			'검색어'
		]}
		columns={[
			[
				metric.request_id,
				metric.date,
				`${metric.search_time}/${metric.filter_time}/${metric.search_time + metric.filter_time}`,
				(metric.all ?? []).length,
				(metric.filtered ?? []).length,
				metric.filter_keywords.map((keyword) => `"${keyword}"`).join(', '),
				metric.search_keyword
			]
		]}
	></Table>

	<div style={'display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));'}>
		<div class="flex w-fit flex-col gap-2 text-center">
			<p class="text-xl text-gray-500">검색 결과</p>

			{#if metric.all.length === 0}
				<p class="text-lg text-gray-500">결과 없음</p>
			{:else}
				{#each metric.all as video}
					{@const { title, description, hashes, thumbnail, video_url } = video}
					<ResponsiveCard
						image={thumbnail}
						image_alt={title}
						url={video_url}
						{title}
						{description}
						{hashes}
					></ResponsiveCard>
				{/each}
			{/if}
		</div>
		<div class="flex w-fit flex-col gap-2 text-center">
			<p class="text-xl text-gray-500">필터링된 영상</p>

			{#if metric.filtered.length === 0}
				<p class="text-lg text-gray-500">결과 없음</p>
			{:else}
				{#each metric.filtered as video}
					{@const { title, description, hashes, thumbnail, video_url } = video}
					<ResponsiveCard
						image={thumbnail}
						image_alt={title}
						url={video_url}
						{title}
						{description}
						{hashes}
					></ResponsiveCard>
				{/each}
			{/if}
		</div>
	</div>
{/if}
