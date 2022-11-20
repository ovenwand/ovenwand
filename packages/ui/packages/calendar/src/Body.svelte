<script lang="ts">
  import {
    format,
    getDate,
    isFirstDayOfMonth,
    isSameMonth,
  } from '@ovenwand/util.date';
  import Cell from './Cell.svelte';

  export let cells: Date[];
  export let date: Date;
</script>

<div class="grid grid-cols-7 auto-rows-fr flex-auto">
  {#each cells as cellDate, index}
    <Cell dim={!isSameMonth(cellDate, date)}>
      <div>
        <span>{getDate(cellDate)}</span>

        {#if index === 0 || isFirstDayOfMonth(cellDate)}
          <span>{format(cellDate, 'LLL')}</span>
        {/if}
      </div>

      <slot cell={cellDate} />
    </Cell>
  {/each}
</div>
