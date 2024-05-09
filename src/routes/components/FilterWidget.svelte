<script lang="ts">
	import Button from './Button.svelte';
	import TextInput from './TextInput.svelte';

	import { filter_keywords } from '$lib/store/filter_keywords';

	let text: string = '';

	/**
	 * 키워드 추가 함수
	 */
	function addKeyword() {
		// 입력값 좌우 공백 제거
		const value = text.trim();

		// 빈 텍스트 입력 시, 경고 띄우고 무시
		if (value.length === 0) {
			window.alert('빈 텍스트를 입력하였습니다!');
			return;
		}

		if ($filter_keywords.includes(value)) {
			window.alert('이미 포함된 값입니다');
			return;
		}

		// 데이터 추가
		$filter_keywords = [...$filter_keywords, value];
		// 입력 내용 지우기
		text = '';
	}

	function removeKeyword(keyword: string) {
		$filter_keywords = $filter_keywords.filter((_keyword) => !(_keyword === keyword));
	}
</script>

<div class="flex flex-col gap-4 border-2 border-black p-4 text-center">
	<span class="text-xl font-bold">필터링 설정</span>

	<div class="flex flex-row gap-1">
		<TextInput bind:value={text}></TextInput>
		<Button
			on:click={(ev) => {
				console.log(ev);
				addKeyword();
			}}
		>
			추가
		</Button>
	</div>

	<hr />

	<div class="flex flex-col gap-2">
		{#each $filter_keywords as keyword}
			<div class="flex flex-row gap-1">
				<TextInput value={keyword} readonly={true}></TextInput>
				<Button on:click={() => removeKeyword(keyword)}>X</Button>
			</div>
		{/each}
	</div>
</div>
