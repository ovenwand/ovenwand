import { promises as fsp } from 'node:fs';
import type { FaunaImportMode, GqlClient } from './gql';

export const importSchema = (
	schemaPath: string,
	token: string,
	mode: FaunaImportMode = 'merge'
) => {
	return async ({ request }: Pick<GqlClient, 'request'>) => {
		const schema = await fsp.readFile(schemaPath);
		const response = await request(`/import`, { mode, schema }, { secret: token });
		const result = await response.text();

		if (!response.ok) {
			return { data: null, errors: [result] };
		}

		return { data: result, errors: null };
	};
};
