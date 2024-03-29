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
			landmarks{
				_id
				name
				owner
			}
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
			landmarks{
				_id
				name
				owner
			}
			sortRule
			sortDirection
		}
	}
`;

export const GET_ALL_SIBLINGS = gql`
	query GetAllSiblings($id: String!) {
		getAllSiblings(_id: $id) {
			_id
			name
			capital
			leader
			flag
			landmarks{
				_id
				name
				owner
			}
			sortRule
			sortDirection
		}
	}
`;

export const GET_ALL_PARENT_SIBLINGS = gql`
	query GetAllParentSiblings($id: String!) {
		getAllParentSiblings(_id: $id) {
			_id
			name
			capital
			leader
			flag
			landmarks{
				_id
				name
				owner
			}
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

export const GET_CHILD_LANDMARKS = gql`
	query GetChildLandmarks($id: String!){
		getChildLandmarks(_id: $id) {
			_id
			name
			owner
		}
	}
`;

export const GET_REGION_NAME_BY_LANDMARK = gql`
	query GetRegionNameByLandmark($owner: String!){
		getRegionNameByLandmark(owner: $owner)
	}
`;