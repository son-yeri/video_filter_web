<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	/** input 엘리먼트 입력값 */
	export let value: string = '';
	export let placeholder: string = 'Search';
	/** 검색 버튼 텍스트 */
	export let button_text: string = 'Search';

	const dispatch = createEventDispatcher();
</script>

<div class="join">
	<div>
		<div>
			<input class="input join-item input-bordered w-60 md:w-80" {placeholder} bind:value />
		</div>
	</div>
	<button
		class="btn join-item"
		on:click={(ev) => {
			// 버튼 클릭 이벤트 전파
			dispatch('click', ev);
		}}>{button_text}</button
	>
</div>
