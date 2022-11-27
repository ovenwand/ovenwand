<script lang="ts">
  import { format } from '@ovenwand/util.date';
  import { Button } from '@ovenwand/ui.button';

  export let date: Date;
  export let today: string;
  export let previous: string;
  export let next: string;
</script>

<div>
  <div class="flex p-2 bg-gray-400 dark:bg-gray-900">
    <Button href={today} title={format(new Date(), 'EEEE, dd MMMM')}>
      Today
    </Button>

    <Button class="ml-3" href={previous}>
      &lt;
    </Button>

    <Button class="mr-3" href={next}>
      &gt;
    </Button>

    <h2 class="leading-10">
      {format(date, 'LLLL yyyy')}
    </h2>

    <div class="flex-grow"></div>

    <Button>
      Month &#9660;
    </Button>
  </div>
</div>
