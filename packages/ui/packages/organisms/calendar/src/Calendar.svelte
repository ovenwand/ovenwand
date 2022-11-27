<script lang="ts">
  import {
    addDays,
    getDay,
    startOfMonth,
  } from '@ovenwand/util.date';
  import Toolbar from './Toolbar.svelte';
  import Header from './Header.svelte';
  import Body from './Body.svelte';

  export let date = new Date();

  export let today: string;
  export let previous: string;
  export let next: string;

  $: cells = Array.from(
    Array(7 * 5),
    (_, index) => {
      const firstOfMonth = startOfMonth(date);
      const calendarOffset = -getDay(firstOfMonth);
      const calendarIndex = index + 1;
      return addDays(firstOfMonth, calendarOffset + calendarIndex);
    }
  );
</script>

<div class="bg-gray-300 dark:bg-gray-800 h-full flex flex-col">
  <Toolbar {date} {today} {previous} {next} />

  <Header/>

  <Body {cells} {date} let:cell>
    <slot date={cell}/>
  </Body>
</div>
