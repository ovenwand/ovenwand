import { gql } from '@ovenwand/gql';
import TaskFields from '../Task.fields.gql?raw';

export const CurrentTask = gql`
	query CurrentTask {
		currentTask {
			${TaskFields}
		}
	}
`;
