import type { RequestEvent } from '@sveltejs/kit';
import type { Data } from '@ovenwand/services.faunadb';
import { gql } from '$lib/database';
import type { IEventData, IProject, IProjectData } from '$lib/store';

const FindAllProjects = `
    query FindAllProjects {
      allProjects {
        data {
          _id
          name
          events(_size: 100) {
            data {
              _id
              type
              timestamp
              page
              uri
              details {
              	agent
              	speed
              }
              project {
                _id
              }
            }
          }
        }
      }
    }
`;

export async function GET({ locals }: RequestEvent) {
	const { errors, data } = await gql<{ allProjects: Data<IProjectData[]> }>(
		FindAllProjects,
		{
			size: 20
		},
		{
			secret: locals.token
		}
	);

	// if (errors?.length) {
	// 	throw new Error(errors[0].message);
	// }

	return {
		status: errors ? 500 : 200,
		body: {
			errors,
			data: {
				projects: data?.allProjects?.data.map(mapDataToProject),
				events: data?.allProjects?.data?.reduce<IEventData[]>(getEventsFromProject, [])
			}
		}
	};
}

function mapDataToProject(data: IProjectData): IProject {
	return {
		...data,
		events: [...data.events.data]
	};
}

function getEventsFromProject(events: IEventData[], project: IProjectData): IEventData[] {
	return [...events, ...project.events.data];
}
