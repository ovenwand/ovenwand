import type { RequestEvent } from '@sveltejs/kit';
import type { Data } from '@ovenwand/services.faunadb';
import { gql } from '$lib/database';
import type { IProjectData } from '$lib/store';

export async function POST({ request }: RequestEvent) {
	const body = await request.formData();

	const { errors } = await gql<{ createProject: Data<IProjectData> }>(
		`
		mutation CreateProject($data: ProjectInput!) {
			createProject(data: $data) {
				_id
				name
			}
		}`,
		{
			data: {
				name: body.get('name')
			}
		}
	);

	if (errors) {
		return {
			status: 400,
			errors
		};
	}

	return {
		location: '/'
	};
}
