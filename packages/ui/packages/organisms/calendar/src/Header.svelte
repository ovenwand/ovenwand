<script lang="ts">
	import { daysOfTheWeek } from '@ovenwand/util.date';
</script>

<div class="grid grid-cols-7">
	{#each daysOfTheWeek as day}
		<div class="px-4 pt-4">
			{day}
		</div>
	{/each}
</div>
