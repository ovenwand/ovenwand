<script lang="ts" context="module">
	import { useAuth } from '$lib/auth';
	export const load = useAuth();
</script>

<slot />
