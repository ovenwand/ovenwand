<script context="module">
	import { useContent, Blog, Author, Page, Text } from '../../content';

	useContent({
		blog: Blog,
		page: Page,
		person: Author,
		text: Text
	});
</script>

<slot />
