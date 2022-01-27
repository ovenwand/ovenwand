<script lang="ts">
  import '../../../../app.css';

  let className: string;
  export { className as class };
</script>

<div id="app" class={className}>
	<main>
		<slot/>
	</main>
</div>