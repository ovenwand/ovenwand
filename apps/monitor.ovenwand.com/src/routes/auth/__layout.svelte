<script lang="ts" context="module">
	import { useAuth } from '$lib/auth';
	export const load = useAuth(['/auth/register']);
</script>

<slot />
