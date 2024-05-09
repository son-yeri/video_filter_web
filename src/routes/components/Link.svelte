<script lang="ts">
	export let href: string;
	export let target: '_blank' | '_self' | '_top' | '_parent' = '_blank';
</script>

<a class="link" {href} {target}>
	<slot></slot>
</a>
