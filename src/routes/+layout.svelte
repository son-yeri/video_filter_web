<script>
	import '../app.pcss';
</script>

<div data-theme="cmyk" class="g-4 flex h-screen w-screen flex-col items-center">
	<!-- 컨테이너 -->
	<div class="g-4 flex w-full max-w-screen-lg flex-col justify-center xl:max-w-screen-xl">
		<slot></slot>
	</div>
</div>
