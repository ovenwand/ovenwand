import { gql } from '@ovenwand/gql';

export const UpdateTask = gql`
	mutation UpdateTask($id: ID!, $data: TaskInput!) {
		updateTask(id: $id, data: $data) {
			_id
		}
	}
`;
