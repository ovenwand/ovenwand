import { gql } from '@ovenwand/gql';
import TaskFields from '../Task.fields.gql?raw';

export const CreateTask = gql`
	mutation CreateTask($data: TaskInput!) {
		createTask(data: $data) {
			${TaskFields}
		}
	}
`;
