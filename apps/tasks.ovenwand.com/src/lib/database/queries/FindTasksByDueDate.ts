import { gql, type DocumentNode } from '@ovenwand/gql';
import TaskFields from './fields/Task.gql?raw';

export const FindTasksByDueDate: DocumentNode = gql`
	query FindTasksByDueDate($fromDate: Time!, $toDate: Time!) {
		findTasksByDueDate(fromDate: $fromDate, toDate: $toDate) {
			${TaskFields}
			labels {
				data {
					_id
				}
			}
		}
	}
`;
