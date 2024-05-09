<script lang="ts">
	import FilterWidget from './components/FilterWidget.svelte';
	import Header from './components/Header.svelte';
	import PerformanceMetric from './components/PerformanceMetric.svelte';
	import SearchResults from './components/SearchResults.svelte';
</script>

<Header></Header>

<!-- main -->
<main class="grid grid-cols-[3fr,1fr] gap-4">
	<SearchResults></SearchResults>

	<section class="flex flex-col gap-4">
		<FilterWidget></FilterWidget>
		<!-- TODO: 성능 측정 후, 데이터 기입할 수 있도록 추가 상태(state), 성능 계싼 및 저장 로직 필요 -->
		<PerformanceMetric
			metric={{
				all: [],
				filtered: [],
				filter_time: 100,
				search_time: 30
			}}
		></PerformanceMetric>
	</section>
</main>
