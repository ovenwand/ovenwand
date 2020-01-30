<script context="module">
	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`blog/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			if (typeof Image !== 'undefined') {
				const img = new Image();
				img.src = data.featured_image;
			}

			return {
				post: data,
			};
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	import { fade } from 'svelte/transition';
	import { action, fluid, BACK } from '@/store/header';
	import { Page } from '@/core/components';
	import { delay, duration, send, receive } from './crossfade';

	fluid.set(false);
	action.set(BACK);

	export let post;
</script>

<style>
	img {
		width: 100%;
	}
</style>

<Page title={post.title}>
	<div class="post">
        <div class="post__header">
            <div class="o-ratio" style="--ratio-x: 16; --ratio-y: 9;">
				<img
					class="o-ratio__content"
					src={post.featured_image}
					alt={post.title}
					in:receive={{ key: `post.image.${post.slug}` }}
					out:send={{ key: `post.image.${post.slug}` }}
				/>
			</div>
		</div>

		<h1
			class="post__title"
			in:receive={{ key: `post.title.${post.slug}` }}
			out:send={{ key: `post.title.${post.slug}` }}
		>
			{post.title}
		</h1>

		<span class="post__author" in:fade={{ delay: duration, duration: delay }} out:fade={{ duration: delay }}>
			{post.author}
		</span>

		<span class="post__date" title={`Created at: ${post.created_at}`} in:fade={{ delay: duration, duration: delay }} out:fade={{ duration: delay }}>
			{post.updated_at}
		</span>

		<div class="post__content" in:fade={{ delay: duration, duration: delay }} out:fade={{ duration: delay }}>
			{@html post.content}
		</div>
	</div>
</Page>
