<script lang="ts" context="module">
	import { withAuth } from '$lib/auth';
	export const load = withAuth();
</script>

<slot />
