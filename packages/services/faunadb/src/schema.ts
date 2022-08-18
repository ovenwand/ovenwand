import { promises as fsp } from 'node:fs';
import type { FaunaImportMode, GqlClient } from './gql';

export const importSchema = (schemaPath: string, mode: FaunaImportMode = 'merge') => {
	return async ({ request }: GqlClient) => {
		const schema = await fsp.readFile(schemaPath);
		const response = await request(`/import`, { mode, schema });
		const result = await response.text();

		if (!response.ok) {
			return { errors: [result] };
		}

		return { data: result };
	};
};
