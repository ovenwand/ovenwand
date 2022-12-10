import { gql, type DocumentNode } from '@ovenwand/gql';
import TaskFields from '../Task.fields.gql?raw';

export const TasksByDueDate: DocumentNode = gql`
	query TasksByDueDate($fromDate: Time!, $toDate: Time!) {
		tasksByDueDate(fromDate: $fromDate, toDate: $toDate) {
			${TaskFields}
		}
	}
`;
