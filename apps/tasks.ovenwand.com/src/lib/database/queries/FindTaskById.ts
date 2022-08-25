import { gql } from '@ovenwand/gql';

export const FindTaskById = gql`
	query FindTaskByID($id: ID!) {
		findTaskByID(id: $id) {
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
