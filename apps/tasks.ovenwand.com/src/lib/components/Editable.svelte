<script lang="ts">
	import { tick } from 'svelte';
	import { createClassName } from '@ovenwand/util';
	import { Button } from '@ovenwand/ui';
	import { enhance } from '$app/forms';

	export let tag = 'p';
	export let type: 'text' | 'textarea' = 'text';
	export let editable = false;
	export let name: string;
	export let value: string;
	export let action: string | undefined = undefined;

	$: inputValue = value;

	let formElement: HTMLFormElement;
	let inputElement: HTMLInputElement;
	let saveButton: Button;
	let cancelButton: Button;

	$: containerClassName = createClassName({
		relative: true
	});

	$: elementClassName = createClassName({
		absolute: editable
	});

	$: formClassName = createClassName({
		'relative flex': true
	});

	$: inputClassName = createClassName({
		'bg-transparent border-0 text-transparent w-fit': true,
		[$$restProps.class]: $$restProps.class
	});

	async function edit() {
		editable = true;
		await tick();
		inputElement?.focus();
	}

	function reset(event?: FocusEvent) {
		if (event && [saveButton.element, cancelButton.element].includes(event?.relatedTarget)) {
			return;
		}

		editable = false;
		inputValue = value;
	}
</script>

<div class={containerClassName}>
	<button class={elementClassName} disabled={editable} on:click={edit}>
		<svelte:element this={tag} {...$$restProps}>
			{inputValue}
		</svelte:element>
	</button>

	{#if editable}
		<form
			bind:this={formElement}
			class={formClassName}
			method="POST"
			{action}
			use:enhance={() => {
				editable = false;
				value = inputValue;
			}}
		>
			<slot />

			{#if type === 'textarea'}
				<textarea class={inputClassName} {name} bind:value={inputValue} on:blur={reset} />
			{:else}
				<input
					bind:this={inputElement}
					type="text"
					class={inputClassName}
					{name}
					bind:value={inputValue}
					on:blur={reset}
				/>
			{/if}

			<Button bind:this={saveButton} type="submit">Save</Button>

			<Button bind:this={cancelButton} on:click={reset}>Cancel</Button>
		</form>
	{/if}
</div>
