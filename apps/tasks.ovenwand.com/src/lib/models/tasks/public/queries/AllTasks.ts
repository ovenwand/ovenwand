import { gql, type DocumentNode } from '@ovenwand/gql';
import TaskFields from '../Task.fields.gql?raw';

export const AllTasks: DocumentNode = gql`
	query AllTasks {
		tasks {
			data {
				${TaskFields}
			}
		}
	}
`;
