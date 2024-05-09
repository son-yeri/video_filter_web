<script lang="ts">
	export let placeholder: string = 'Type here';
	export let value: string = '';
	export let disabled: boolean = false;
	export let readonly: boolean = false;
</script>

<input
	type="text"
	class="input input-bordered w-full max-w-xs"
	{placeholder}
	{disabled}
	{readonly}
	bind:value
/>
