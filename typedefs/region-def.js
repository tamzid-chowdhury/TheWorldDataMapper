const { gql } = require('apollo-server');

const typeDefs = gql `
    type Region {
        _id: String
        name: String
        capital: String
        leader: String
        flag: String
        landmarks: [Landmark]
        owner: String
        parentRegion: String
        sortRule: String
        sortDirection: Int
    }

    type Landmark {
        _id: String!
        name: String!
        owner: String!
    }

    extend type Query {
        getRootRegions: [Region]
        getRegionById(_id: String!): Region
        getAllSubregions(_id: String!, sortRule: String, sortDirection: Int): [Region]
        getAncestorRegions(_id: String!): [Region]
        getAllSiblings(_id: String!): [Region]
        getAllParentSiblings(_id: String!): [Region]
    }

    extend type Mutation { 
        addRootRegion(name: String!): Region
        deleteRootRegion(_id: String!): Boolean
        editMapName(_id: String!, name: String!): Region
        addNewSubregion(_id: String!): Region
        deleteSubregion(_id: String!): Region
        addSubregion(subregion: RegionInput!): Region
        editSubregion(regionID: String!, field: String!, newValue: String!):Boolean
        sortSubregion(regionID: String!, newName: String!): Region
        undoSortSubregion(regionID: String!, prevName: String!, prevDirection: Int!): Region
        changeParentRegion(regionID: String!, newParentRegionID: String!): Boolean
        addLandmark(regionID:String!, newLandmark:String!): String
        deleteLandmark(regionID:String!, landmarkID:String!): Region
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
        sortRule: String
        sortDirection: Int
	}

`;

module.exports = { typeDefs: typeDefs }