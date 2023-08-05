<script>
    import { Button, Prose, Sheet } from '@ovenwand/design/patterns.svelte';

    /**
     * Form action attribute.
     * @type {string | undefined}
     */
    export let action = '/service/tracking/consent';

    /**
     * Name of the field that will be sent to the server.
     * @type {string}
     */
    export let consentFieldName = 'consent';

    /**
     * Value that will be sent to the server when the user accepts tracking.
     * @type {string}
     */
    export let consentAcceptValue = 'accept';

    /**
     * Value that will be sent to the server when the user declines tracking.
     * @type {string}
     */
    export let consentDeclineValue = 'decline';

    /**
     * @typedef {{ update?: (parameters: any) => void, destroy?: () => void }} ActionResult
     */

    /**
     * @typedef {(node: HTMLElement, parameters: any) => ActionResult | void} Action
     */

    /**
     * Action that will be applied to the form element.
     * @type {Action}
     */
    export let enhance = () => {};

    /**
     * Options for the enhance action.
     * @type {unknown}
     */
    export let enhanceOptions = {};
</script>

<Sheet {...$$restProps}>
    <form method="POST" {action} use:enhance={enhanceOptions}>
        <Prose class="p-4">
            <h1>Hello :)</h1>
            <p>
                In ut tortor sit amet lorem ornare lacinia. Nam lorem ipsum, facilisis faucibus
                rutrum in, tincidunt eget magna. Donec purus nisi, eleifend ut dapibus et, accumsan
                nec enim. Duis cursus gravida rhoncus. Curabitur id orci eget mi gravida eleifend 
                nec a tortor. Nunc dictum mattis finibus. Pellentesque aliquet nibh vitae lacus 
                tincidunt feugiat. Phasellus vitae mattis massa.
            </p>

            <p>
                Nunc tempus dui et luctus venenatis. Praesent ut luctus nunc, eu ultricies orci.
                Mauris imperdiet turpis ac ligula fringilla ultrices. Aliquam pellentesque consequat
                lectus, vitae tempus turpis. Fusce sem quam, luctus at feugiat sed, mollis at ante.
                Ut porta mauris eget est dapibus egestas. Aenean condimentum viverra diam ut
                elementum. Nam tincidunt diam sed leo fermentum luctus. Quisque et molestie ex.
                Proin ac sapien id lectus pulvinar ullamcorper.
            </p>
        </Prose>
        <div class="grid grid-cols-2">
            <Button
                type="submit"
                variant="secondary"
                size="2xl"
                name={consentFieldName}
                value={consentDeclineValue}
            >
                Decline
            </Button>
            <Button
                type="submit"
                size="2xl"
                name={consentFieldName}
                value={consentAcceptValue}
            >
                Accept
            </Button>
        </div>
        <Prose class="p-4">
            <p>
                Or go to your <a href="/service/tracking/preferences">tracking preferences</a>.
            </p>
        </Prose>
    </form>
</Sheet>
