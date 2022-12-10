import { gql, type DocumentNode } from '@ovenwand/gql';
import TaskFields from '../Task.fields.gql?raw';

export const TasksByStatus: DocumentNode = gql`
	query TasksByStatus($status: String) {
		currentTask(status: $status) {
		  ${TaskFields}
		}
	}
`;
