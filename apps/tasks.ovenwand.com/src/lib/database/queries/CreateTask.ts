import { gql } from '@ovenwand/gql';

export const CreateTask = gql`
	mutation CreateTask($data: TaskInput!) {
		createTask(data: $data) {
			_id
			title
			description
			size
			priority
			businessValue
			dueDate
			done
			labels {
				data {
					_id
				}
			}
		}
	}
`;
