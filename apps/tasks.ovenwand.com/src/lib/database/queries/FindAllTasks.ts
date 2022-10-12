import { gql, type DocumentNode } from '@ovenwand/gql';
import TaskFields from './fields/Task.gql?raw';
import LabelFields from './fields/Label.gql?raw';

export const FindAllTasks: DocumentNode = gql`
	query FindAllTasksAndLabels {
		tasks {
			data {
				${TaskFields}
				labels {
					data {
						_id
					}
				}
			}
		}
		labels {
			data {
				${LabelFields}
			}
		}
	}
`;
