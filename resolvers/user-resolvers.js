const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../models/user-model');

module.exports = {
    Query: {
        getCurrentUser: async() => {
            return -1; 
        }
    },
    Mutation: {
        login: async() => {
            return -1; 
        },
        register: async() => {
            return -1; 
        }, 
        logout: () => {
            return -1; 
        }
    }
}
