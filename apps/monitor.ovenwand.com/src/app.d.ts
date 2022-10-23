/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	interface Locals {
		id?: string;
		token: string;
		referrer: URL;
	}

	// interface Platform {}

	interface Session {
		id?: string;
		token: string;
	}

	// interface Stuff {}
}
