import { gql } from '@ovenwand/gql';
import TaskFields from './fields/Task.fields.gql?raw';

export const FindCurrentTask = gql`
	query FindCurrentTask {
		findCurrentTask {
			${TaskFields}
			labels {
				data {
					_id
				}
			}
		}
	}
`;
