<script lang="ts">
	import { Button } from '@ovenwand/ui';

	function onButtonClick() {
		fetch('/api/system/database/migrate');
	}
</script>

<Button on:click={onButtonClick}>Migrate</Button>
