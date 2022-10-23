import { gql } from '@ovenwand/gql';

export const Login = gql`
	mutation Login($data: LoginInput!) {
		login(data: $data) {
			instance {
				_id
				role
			}
			secret
		}
	}
`;
