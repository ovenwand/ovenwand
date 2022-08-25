import { gql, type DocumentNode } from '@ovenwand/gql';

export const FindAllTasks: DocumentNode = gql`
	query FindAllTasksAndLabels {
		tasks {
			data {
				_id
				title
				description
				size
				priority
				businessValue
				dueDate
				done
				schedule
				labels {
					data {
						_id
					}
				}
			}
		}
		labels {
			data {
				_id
				name
				description
			}
		}
	}
`;
