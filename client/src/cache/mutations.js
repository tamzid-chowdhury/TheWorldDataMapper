import { gql } from "@apollo/client";

export const REGISTER = gql`
	mutation Register($email: String!, $password: String!, $name: String!) {
		register(email: $email, password: $password, name: $name) {
			email
			password
			name
		}
	}
`;

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			_id
			email 
			password
			name
		}
	}
`;

export const LOGOUT = gql`
	mutation Logout {
		logout 
	}
`;

export const UPDATE = gql`
	mutation Update($email: String!, $password: String!, $name: String!) {
		update(email: $email, password: $password, name: $name) {
			email
			password
			name
		}
	}
`;

export const CREATE_NEW_MAP = gql`
	mutation CreateNewMap($name: String!){
		addRootRegion(name: $name) {
			_id
			name
			owner
		}
	}
`;

export const DELETE_MAP = gql`
	mutation DeleteMap($_id: String!){
		deleteRootRegion(_id: $_id)
	}
`;

export const EDIT_MAP_NAME = gql`
	mutation EditMapName($_id: String!, $name: String!){
		editMapName(_id: $_id, name: $name) {
			_id
			name
			owner
		}
	}
`;

export const ADD_NEW_SUBREGION = gql`
	mutation AddNewSubregion($_id: String!){
		addNewSubregion(_id: $_id) {
			_id
			name
			capital
			leader
			parentRegion
			sortRule
			sortDirection
		}
	}
`;

export const DELETE_SUBREGION = gql`
	mutation DeleteSubregion($_id: String!){
		deleteSubregion(_id: $_id){
			_id
			name
			capital
			leader
			parentRegion
		}
	}
`;

export const ADD_SUBREGION = gql`
	mutation AddSubregion($subregion: RegionInput!) {
		addSubregion(subregion: $subregion){
			_id
			name
			capital
			leader
			flag
			parentRegion
			sortRule
			sortDirection
		}
	}
`;

export const EDIT_SUBREGION = gql`
	mutation EditSubregion($regionID: String!, $field: String!, $newValue: String!) {
		editSubregion(regionID: $regionID, field: $field, newValue: $newValue)
	}
`;

export const SORT_SUBREGION = gql`
	mutation SortSubregion($regionID: String!, $newName: String!) {
		sortSubregion(regionID: $regionID, newName: $newName){
			_id
			name
			capital
			leader
			flag
			parentRegion
			sortRule
			sortDirection
		}
	}
`;

export const UNDO_SORT_SUBREGION = gql`
	mutation UndoSortSubregion($regionID: String!, $prevName: String!, $prevDirection: Int!) {
		undoSortSubregion(regionID: $regionID, prevName: $prevName, prevDirection: $prevDirection){
			_id
			name
			capital
			leader
			flag
			parentRegion
			sortRule
			sortDirection
		}
	}
`;

export const CHANGE_PARENT_REGION = gql`
	mutation ChangeParentRegion($regionID: String!, $newParentRegionID: String!) {
		changeParentRegion(regionID: $regionID, newParentRegionID: $newParentRegionID)
	}
`;

export const ADD_LANDMARK = gql`
	mutation AddLandmark($regionID: String!, $newLandmark: String!) {
		addLandmark(regionID: $regionID, newLandmark: $newLandmark)
	}
`;

export const DELETE_LANDMARK = gql`
	mutation DeleteLandmark($regionID: String!, $landmarkID: String!) {
		deleteLandmark(regionID: $regionID, landmarkID: $landmarkID){
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