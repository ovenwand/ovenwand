<script lang="ts">
  import { Layout } from '@ovenwand/app';
  import { Notifications } from '@ovenwand/ui';
  import { ViewFooter } from '$lib/components';
</script>

<Layout footer>
  <slot/>

  <svelte:fragment slot="after-content">
    <ViewFooter />
  </svelte:fragment>

  <svelte:fragment slot="outside">
    <Notifications top />
  </svelte:fragment>
</Layout>