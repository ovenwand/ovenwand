import { gql, type DocumentNode } from '@ovenwand/gql';

export const Logout: DocumentNode = gql`
	mutation Logout($all: Boolean = false) {
		logout(all: $all)
	}
`;
