const { gql } = require('apollo-server');

const typeDefs = gql `
    type Region {
        _id: String
        name: String
        capital: String
        leader: String
        landmarks: [String]
        owner: String
        parentRegion: String
    }

    extend type Query {
        getRootRegions: [Region]
    }

    extend type Mutation { 
        addRootRegion(name: String!): Region
    }

    input RegionInput {
		_id: String
		name: String
        capital: String
        leader: String
        landmarks: [String]
        owner: String
        parentRegion: String
	}

`;

module.exports = { typeDefs: typeDefs }