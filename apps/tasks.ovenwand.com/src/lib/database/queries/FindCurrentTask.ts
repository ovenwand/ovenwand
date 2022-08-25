import { gql } from '@ovenwand/gql';

export const FindCurrentTask = gql`
	query FindCurrentTask {
		findCurrentTask {
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
