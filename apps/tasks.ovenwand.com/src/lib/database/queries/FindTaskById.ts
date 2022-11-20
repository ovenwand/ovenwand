import { gql } from '@ovenwand/gql';
import TaskFields from './fields/Task.fields.gql?raw';

export const FindTaskById = gql`
	query FindTaskByID($id: ID!) {
		findTaskByID(id: $id) {
			${TaskFields}
			labels {
				data {
					_id
				}
			}
		}
	}
`;
