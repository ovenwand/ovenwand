import { promises as fsp } from 'node:fs';
import { fauna, type FaunaImportMode } from './request';

export async function importSchema(schemaPath: string, mode: FaunaImportMode = 'merge') {
	const schema = await fsp.readFile(schemaPath);
	const response = await fauna(`/import`, { mode, schema });
	const result = await response.text();

	if (!response.ok) {
		return { errors: [result] };
	}

	return { data: result };
}
