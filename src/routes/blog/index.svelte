<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
			return { posts };
		});
	}
</script>

<script>
    import { Col } from '@/core/components';
    import Page from '../../core/components/Page.svelte';
	import { action, fluid, BRAND } from '../../store/header';

	fluid.set(false);
	action.set(BRAND);

	export let posts;
</script>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}

	.post-list-item {
        display: flex;
	}

	.post-list-item__image {
		height: 100%;
		object-fit: cover;
        width: 100%;
	}
</style>

<Page title="Blog" background="/images/background.png" lightText>
	<h1>Recent posts</h1>

	<ul>
		{#each posts as post}
		<!-- we're using the non-standard `rel=prefetch` attribute to
			tell Sapper to load the data for the page as soon as
			the user hovers over the link or taps it, instead of
			waiting for the 'click' event -->
			<li class="post-list-item">
                <Col sm={6}>
					<a rel='prefetch' href="blog/{post.slug}">
						{post.title}
					</a>
					<span>
						{post.summary}
					</span>
				</Col>
                <Col sm={6}>
					<img
						src={post.featured_image}
						alt={post.title}
						class="post-list-item__image"
					/>
				</Col>
			</li>
		{/each}
	</ul>
</Page>
