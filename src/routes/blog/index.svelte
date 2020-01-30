<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
			return { posts };
		});
	}
</script>

<script>
	import { fade } from 'svelte/transition';
    import { Col } from '@/core/components';
    import Page from '../../core/components/Page.svelte';
	import { action, fluid, BRAND } from '../../store/header';
	import { delay, duration, send, receive } from './crossfade';

	fluid.set(false);
	action.set(BRAND);

	export let posts;
</script>

<style lang="scss">
    .post-list {
        margin: 0;
		padding: 0;
	}

	.post-list__item {
        display: flex;
		flex-wrap: wrap;

		&:not(:last-child) {
            margin-bottom: 3.2rem;
		}

		a {
			text-decoration: none;
		}
	}
</style>

<Page title="Blog" background="/images/background.png" lightText>
    <div style="overflow: hidden;">
		<h1 in:fade={{ delay: duration, duration: delay }} out:fade={{ duration: delay }}>Recent posts</h1>

		<ul class="post-list">
			{#each posts as post}
				<li class="post-list__item">
					<Col padding sm={6}>
						<a rel="prefetch" href="blog/{post.slug}" title="Click to read the post">
							<h3
								in:receive={{ key: `post.title.${post.slug}` }}
								out:send={{ key: `post.title.${post.slug}` }}
							>
								{post.title}
							</h3>
						</a>
						<p in:fade={{ delay: duration, duration: delay }} out:fade={{ duration: delay }}>
							{post.summary}
						</p>
					</Col>
					<Col sm={6}>
						<a rel="prefetch" href="blog/{post.slug}" title="Click to read the post">
							<div class="o-ratio" style="--ratio-x: 16; --ratio-y: 9;">
								<img
									class="o-ratio__content"
									src={post.featured_image}
									alt={post.title}
									in:receive={{ key: `post.image.${post.slug}` }}
									out:send={{ key: `post.image.${post.slug}` }}
								/>
							</div>
						</a>
					</Col>
				</li>
			{:else}
                <h3>No blog posts yet.</h3>
			{/each}
		</ul>
	</div>
</Page>
