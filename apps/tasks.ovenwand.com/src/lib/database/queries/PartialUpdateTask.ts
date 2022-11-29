import { gql } from '@ovenwand/gql';
import TaskFields from './fields/Task.fields.gql?raw';

export const PartialUpdateTask = gql`
	mutation PartialUpdateTask($id: ID!, $data: PartialUpdateTaskInput!) {
		partialUpdateTask(id: $id, data: $data) {
			${TaskFields}
		}
	}
`;
