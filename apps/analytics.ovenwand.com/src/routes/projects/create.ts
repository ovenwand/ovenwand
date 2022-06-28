import type { RequestEvent } from '@sveltejs/kit';
import { gql, type Data } from '@ovenwand/services.faunadb';
import type { IProjectData } from '$lib/store';

export async function post({ request }: RequestEvent) {
	const body = await request.json();

	const { data, errors } = await gql<{ createProject: Data<IProjectData> }>(
		`
		mutation CreateProject($data: ProjectInput!) {
			createProject(data: $data) {
				_id
				name
			}
		}`,
		{
			data: {
				name: body.name
			}
		}
	);

	return {
		body: {
			errors,
			data: data?.createProject
		}
	};
}
