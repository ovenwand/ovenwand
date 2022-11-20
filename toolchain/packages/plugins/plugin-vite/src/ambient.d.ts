/// <reference path="../../plugin-config/src/ambient.d.ts" />
/// <reference path="../../plugin-cli/src/ambient.d.ts" />


declare namespace Toolchain {
	import { UserConfigExport } from 'vite';

	interface Config {
		vite: { enabled: boolean, configs: UserConfigExport[] },
	}
}
