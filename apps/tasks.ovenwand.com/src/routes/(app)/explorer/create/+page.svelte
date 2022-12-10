<script lang="ts">
	import { Button } from '@ovenwand/ui';
	import { Panel } from '$lib/components';
</script>

<Panel>
	<form method="POST" action="?/createTask">
		<div>
			<label>
				<span>Title*</span>
				<input name="title" />
			</label>
		</div>

		<div>
			<label>
				<span>Description</span>
				<textarea name="description" />
			</label>
		</div>

		<Button type="submit">Create</Button>
	</form>
</Panel>
