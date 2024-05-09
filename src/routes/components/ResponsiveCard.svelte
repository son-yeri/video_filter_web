<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Badge from './Badge.svelte';

	export let image: string;
	export let image_alt: string = '';
	export let title: string;
	export let description: string;
	export let hashes: string[];
	export let button_text: string = 'Button Text';

	export let url: string = '';
	export let target: '_blank' | '_self' | '_parent' | '_top' = '_blank';

	/** 버튼을 사용하지 않는 경우 활성화 */
	export let hide_button: boolean = true;

	const dispatcher = createEventDispatcher();
</script>

<div class="card h-5/6 bg-base-100 text-left shadow-xl md:card-side">
	<figure>
		<img src={image} alt={image_alt} />
	</figure>
	<div class="card-body">
		<h2 class="card-title">
			{#if url.length > 0}
				<a href={url} {title} {target}>{title}</a>
			{:else}
				{title}
			{/if}
		</h2>
		<p class="grow-0">
			{#if url.length > 0}
				<a href={url} title={description} {target}>{description}</a>
			{:else}
				{description}
			{/if}
		</p>
		<span class="hashes">
			{#each hashes as hash}
				<Badge>#{hash}</Badge>
			{/each}
		</span>
		{#if !hide_button}
			<div class="card-actions justify-end">
				<button
					class="btn btn-primary"
					on:click|preventDefault|stopPropagation={(ev) => {
						dispatcher('click', ev);
					}}>{button_text}</button
				>
			</div>
		{/if}
	</div>
</div>
