import { gql } from '@ovenwand/gql';
import TaskFields from './fields/Task.gql?raw';

export const UpdateTask = gql`
	mutation UpdateTask($id: ID!, $data: TaskInput!) {
		updateTask(id: $id, data: $data) {
			${TaskFields}
		}
	}
`;
