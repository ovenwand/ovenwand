<script>
    import { OvenwandServiceTrackingConsentForm } from '@ovenwand/ovenwand.service/islands/tracking-consent-form.svelte';
    import { OVENWAND_SERVICE_TRACKING_CONSENT, OVENWAND_SERVICE_TRACKING_CONSENT_COOKIE } from '@ovenwand/ovenwand.service/utils/tracking-consent-cookie.js';
</script>

<section class="flex items-center justify-center min-w-viewport min-h-viewport">
    <OvenwandServiceTrackingConsentForm
        class="w-full m-4 md:m-16 lg:w-2/3 lg:mx-0 xl:w-1/2"
        consentFieldName={OVENWAND_SERVICE_TRACKING_CONSENT_COOKIE}
        consentAcceptValue={OVENWAND_SERVICE_TRACKING_CONSENT.ACCEPT}
        consentDeclineValue={OVENWAND_SERVICE_TRACKING_CONSENT.DECLINE}
    />
</section>
