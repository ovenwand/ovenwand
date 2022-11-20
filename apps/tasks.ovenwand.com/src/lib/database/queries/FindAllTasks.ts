import { gql, type DocumentNode } from '@ovenwand/gql';
import TaskFields from './fields/Task.fields.gql?raw';
import LabelFields from './fields/Label.fields.gql?raw';

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
