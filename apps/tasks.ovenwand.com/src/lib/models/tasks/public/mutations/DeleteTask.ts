import { gql } from '@ovenwand/gql';

export const DeleteTask = gql`
	mutation DeleteTask($id: ID!) {
		deleteTask(id: $id) {
			_id
		}
	}
`;
