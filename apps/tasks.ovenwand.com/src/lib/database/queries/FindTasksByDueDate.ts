import { gql, type DocumentNode } from '@ovenwand/gql';

export const FindTasksByDueDate: DocumentNode = gql`
	query FindTasksByDueDate($fromDate: Time!, $toDate: Time!) {
		findTasksByDueDate(fromDate: $fromDate, toDate: $toDate) {
			_id
			title
			description
			priority
			businessValue
			size
			dueDate
			done
			schedule
			labels {
				data {
					_id
				}
			}
		}
	}
`;
