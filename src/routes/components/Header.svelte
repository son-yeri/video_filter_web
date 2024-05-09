<script lang="ts">
	import { goto } from '$app/navigation';
	import { search } from '$lib/store/search_state';
	import Button from './Button.svelte';
	import SearchBar from './SearchBar.svelte';

	/** 검색창 입력값 */
	export let value: string = '';
</script>

<!-- header -->
<div class="flex w-full flex-row place-items-center justify-around gap-4 py-12">
	<span class="text-4xl font-bold">VIDEO</span>
	<SearchBar
		on:click={async () => {
			await search(value);
		}}
		bind:value
	></SearchBar>
	<Button
		on:click={() => {
			goto('/logs');
		}}>Logs</Button
	>
</div>
