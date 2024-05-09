<script lang="ts">
	/** 열 제목들*/
	export let row_titles: string[];
	/** 행 데이터들 */
	export let columns: (string | number)[][];
</script>

<div class="overflow-x-auto">
	<table class="table">
		<thead>
			<tr>
				{#each row_titles as title}
					<th>{title}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each columns as column}
				<tr>
					{#each column as cell}
						<td>{cell}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
