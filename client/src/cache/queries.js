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

export const GET_REGION_BY_ID = gql`
	query GetRegionById($id: String!) {
		getRegionById(_id: $id) {
			_id
			name
			capital
			leader
			landmarks
			owner
			parentRegion
		}
	}
`;

export const GET_ALL_SUBREGIONS = gql`
	query GetAllSubregions($id: String!) {
		getAllSubregions(_id: $id) {
			_id
			name
			capital
			leader
			landmarks
		}
	}
`;