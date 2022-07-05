<script lang="ts" context="module">
	import type { LoadEvent } from '@sveltejs/kit';

	export async function load({ fetch, session }: LoadEvent) {
		if (!session.id) {
			return {
				status: 302,
				redirect: '/auth/login'
			};
		}

		await fetch('/auth/logout', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				Accept: 'application/json'
			}
		});

		return {
			status: 302,
			redirect: '/'
		};
	}
</script>
