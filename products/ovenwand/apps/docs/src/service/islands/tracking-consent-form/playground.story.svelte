<script>
  import TrackingConsentForm from '@ovenwand/ovenwand.service/islands/tracking-consent-form.svelte';

  // Little hack to trick tailwind:

  // End little hack

  /** @type import('@histoire/plugin-svelte').Hst */
  export let Hst;

  $: source = `
  `.trim();
</script>

<Hst.Story id="tracking-consent-form" title="Islands/Tracking consent form">
    <TrackingConsentForm />

		<svelte:fragment slot="controls">
		</svelte:fragment>
</Hst.Story>
