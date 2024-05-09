<script lang="ts">
	import { result_list, searching, search_count } from '$lib/store/search_state';
	import ResponsiveCard from './ResponsiveCard.svelte';
</script>

<section class="flex flex-col gap-2 text-center">
	{#if $searching}
		<p class="text-3xl text-gray-500">검색중...</p>
	{:else if $result_list.length === 0}
		<!-- 검색 결과가 없을 때: -->
		{#if $search_count === 0}
			<!-- 검색을 한 적 없는 경우 -->
			<p class="text-3xl text-gray-500">검색어를 입력해주세요</p>
		{:else}
			<!-- 검색을 한 적이 있는 경우 -->
			<p class="text-3xl text-gray-500">결과 없음</p>
		{/if}
	{:else}
		<!-- 결과 리스트 촤르륵 -->
		{#each $result_list as result}
			{@const { title, description, hashes, thumbnail, video_url } = result}
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
</section>
