<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
			return { posts };
		});
	}
</script>

<script>
	import { fade } from 'svelte/transition';
    import { Col, Page } from '@/core/components';
	import { brand, fluid, BRAND } from '@/store/header';
	import { background } from '@/store/page';
	import { delay, duration, send, receive } from './crossfade';

	fluid.set(false);
	brand.set(BRAND);
	background.set({
		primary: {
		    r: 1.5,
			x: -9730,
			y: -1000,
		},
		secondary: {
			r: 5,
			x: 0,
			y: -9170,
		},
	});

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
