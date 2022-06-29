<script lang="ts">
	import '../app.css';
	import { DefaultLayout, Notifications } from '@ovenwand/ui';
</script>

<DefaultLayout class="h-screen" footer>
	<Notifications top />
	<slot />
</DefaultLayout>
