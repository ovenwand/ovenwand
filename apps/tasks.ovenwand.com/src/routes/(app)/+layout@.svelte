<script lang="ts">
  import '../../app.css';
  import { Layout } from '@ovenwand/app';
  import { Notifications } from '@ovenwand/ui';
  import { Footer } from '$lib/components';
</script>

<Layout footer>
  <slot/>

  <svelte:fragment slot="after-content">
    <Footer />
  </svelte:fragment>

  <svelte:fragment slot="outside">
    <Notifications top />
  </svelte:fragment>
</Layout>