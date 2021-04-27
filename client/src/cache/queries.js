import { gql } from "@apollo/client";

export const GET_DB_USER = gql`
	query GetDBUser {
		getCurrentUser {
			_id
			name
			email
			password
		}
	}
`;


export const GET_USER_MAPS = gql`
	query GetRootRegions {
		getRootRegions {
			_id
			name
			owner
		}
	}
`;