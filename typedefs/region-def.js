const { gql } = require('apollo-server');

const typeDefs = gql `
    type Region {
        _id: String
        name: String
        capital: String
        leader: String
        flag: String
        landmarks: [String]
        owner: String
        parentRegion: String
    }

    extend type Query {
        getRootRegions: [Region]
        getRegionById(_id: String!): Region
        getAllSubregions(_id: String!): [Region]
        getAncestorRegions(_id: String!): [Region]
    }

    extend type Mutation { 
        addRootRegion(name: String!): Region
        deleteRootRegion(_id: String!): Boolean
        editMapName(_id: String!, name: String!): Region
        addNewSubregion(_id: String!): Region
        deleteSubregion(_id: String!): Region
        addSubregion(subregion: RegionInput!): Region
    }

    input RegionInput {
		_id: String
		name: String
        capital: String
        leader: String
        flag: String
        landmarks: [String]
        owner: String
        parentRegion: String
	}

`;

module.exports = { typeDefs: typeDefs }