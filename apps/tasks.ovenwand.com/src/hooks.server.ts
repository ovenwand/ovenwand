import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { PUBLIC_FAUNA_ANONYMOUS_KEY } from '$env/static/public';
import { Auth } from '$lib/auth/private';
import { Referrer } from '$lib/referrer';

export const handle: Handle = sequence(Referrer(), Auth({ anonymous: PUBLIC_FAUNA_ANONYMOUS_KEY }));
