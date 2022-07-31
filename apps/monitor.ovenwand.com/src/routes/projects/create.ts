import type { RequestEvent } from '@sveltejs/kit';
import { gql, type Data } from '@ovenwand/services.faunadb';
import type { IProjectData } from '$lib/store';

export async function POST({ request }: RequestEvent) {
	const body = await request.formData();

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
				name: body.get('name')
			}
		}
	);

	if (errors) {
		return {
			status: 400,
			body: { errors }
		};
	}

	return {
		status: 302,
		headers: {
			location: '/'
		},
		body: {
			data: data?.createProject
		}
	};
}
