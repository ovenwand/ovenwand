/* eslint-disable @typescript-eslint/triple-slash-reference */

/// <reference path="../../plugin-config/src/ambient.d.ts" />
/// <reference path="../../plugin-cli/src/ambient.d.ts" />

/* eslint-enable @typescript-eslint/triple-slash-reference */

declare namespace Toolchain {
	import { UserConfigExport } from 'vite';

	interface Config {
		vite: { enabled: boolean; configs: UserConfigExport[] };
	}
}
