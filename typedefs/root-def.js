const { gql } = require('apollo-server');


const rootDef = gql`
	type Query {
		hello: String!
	}
`;

module.exports = {
	typeDefs: [rootDef] 
}; 