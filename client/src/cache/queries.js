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
			sortRule
			sortDirection
		}
	}
`;

export const GET_ALL_SUBREGIONS = gql`
	query GetAllSubregions($id: String!, $sortRule: String, $sortDirection: Int) {
		getAllSubregions(_id: $id, sortRule: $sortRule, sortDirection: $sortDirection) {
			_id
			name
			capital
			leader
			flag
			landmarks
			sortRule
			sortDirection
		}
	}
`;

export const GET_ANCESTOR_REGIONS = gql`
	query GetAncestorRegions($id: String!){
		getAncestorRegions(_id: $id) {
			_id
			name
		}
	}
`;