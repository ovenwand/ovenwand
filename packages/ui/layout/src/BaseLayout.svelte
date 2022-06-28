<svelte:head>
	<meta name="build-id" content={import.meta.env.VITE_VERCEL_GIT_COMMIT_SHA} />
</svelte:head>

<slot />
