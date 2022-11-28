<script lang="ts">
	import { footer, type Link } from './store';

	export let links: Link[] = [];

	footer.setLinks(links);
</script>
