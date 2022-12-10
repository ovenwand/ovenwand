import { gql } from '@ovenwand/gql';
import TaskFields from '../Task.fields.gql?raw';

export const TaskById = gql`
	query TaskByID($id: ID!) {
		findTaskByID(id: $id) {
			${TaskFields}
		}
	}
`;
