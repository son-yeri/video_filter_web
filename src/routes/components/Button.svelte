<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let disabled: boolean = false;

	const dispatch = createEventDispatcher();
</script>

<button
	class="btn"
	{disabled}
	on:click={(ev) => {
		dispatch('click', ev);
	}}
>
	<slot></slot>
</button>
