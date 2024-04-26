<script lang="ts">
	import { onMount } from 'svelte';
	import { Innertube } from 'youtubei.js/web.bundle.min';
	import { HttpsProxyAgent } from 'https-proxy-agent';
	import fetch from 'node-fetch';

	// 프록시 수행 방법: https://oxylabs.io/resources/integrations/node-fetch
	// 프록시 리스트: https://free-proxy-list.net/

	onMount(async function () {
		const proxyAgent = new HttpsProxyAgent(`http://13.56.80.216:8080`);

		const youtube = await Innertube.create({
			lang: 'ko',
			// TODO: 얘 마저 수정해야 함 (프록시 없으면 진행 안 되는 듯)
			fetch: (input, init) =>
				fetch(input, {
					...init,
					agent: proxyAgent
				})
		});

		console.log(await youtube.search('뽀로로'));
	});
</script>

<div
	data-theme="cmyk"
	class="w-screen h-screen flex flex-col justify-center place-items-center g-4"
>
	<h1>Hello World!</h1>
</div>
