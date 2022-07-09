<script lang="ts">
	import '../app.css';
	import { Notifications } from '@ovenwand/ui';
	import { Layout } from '@ovenwand/app';
</script>

<Layout class="h-screen" footer>
	<Notifications top />
	<slot />
</Layout>
