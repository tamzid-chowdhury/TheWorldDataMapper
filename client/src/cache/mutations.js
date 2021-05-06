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
		}
	}
`;

export const DELETE_SUBREGION = gql`
	mutation DeleteSubregion($_id: String!){
		deleteSubregion(_id: $_id)
	}
`;