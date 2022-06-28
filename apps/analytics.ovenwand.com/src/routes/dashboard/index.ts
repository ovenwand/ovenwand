import { gql, type Data } from '@ovenwand/services.faunadb';
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
              uri
              project {
                _id
                name
              }
            }
          }
        }
      }
    }
`;

export async function get() {
	const { errors, data } = await gql<{ allProjects: Data<IProjectData[]> }>(FindAllProjects, {
		size: 20
	});

	return {
		body: {
			errors,
			data: {
				projects: data?.allProjects?.data.map(mapDataToProject),
				events: data?.allProjects?.data?.reduce(getEventsFromProject, [] as IEventData[])
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
