<script lang="ts">
  import { createClassName } from '@ovenwand/util';
  import { Sheet } from '@ovenwand/ui';

  let className = '';
  export { className as class };

  export let header = true;
  export let footer = true;

  export let title: string = '';
  export let highlight = false;
  export let padding = true;

  $: sheetClassName = createClassName({
    [className]: className,
    'bg-gray-300 dark:bg-gray-900': !highlight,
    'bg-gray-400 dark:bg-gray-800': highlight,
    'min-h-full flex flex-col': true
  });

  $: contentClassName = createClassName({
    'flex-grow': true,
    'px-4 py-2': padding,
  });
</script>

<Sheet class={sheetClassName} rounded shadow>
  {#if header}
    <div class="flex items-center justify-center p-2">
      {#if title}
        <h2 class="text-lg font-bold leading-10 px-2">{title}</h2>
        <div class="flex-grow"></div>
      {/if}

      <slot name="header"/>
    </div>
  {/if}

  <div class={contentClassName}>
    <slot />
  </div>

  {#if footer}
    <div class="p-2">
      <slot name="footer" />
    </div>
  {/if}
</Sheet>
