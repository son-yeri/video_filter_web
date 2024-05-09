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
		<PerformanceMetric></PerformanceMetric>
	</section>
</main>
