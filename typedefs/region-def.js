const { gql } = require('apollo-server');

const typeDefs = gql `
	type Region {
		_id: String!
		name: String
		capital: String
        leader: String
        flag: String
        landmarks: [String!]
        parentRegion: String
    }
    
	extend type Query {
        getAllRootRegions: [Region!]
        getParentRegion: Region
        getAllChildRegions: [Region!]
        getAllSiblingRegions: [Region!]
        getAllAncestorRegions: [Region!]
        getRegionById(_id: String!): Region 
    }
    
	extend type Mutation {

    }
    
`;

module.exports = { typeDefs: typeDefs }