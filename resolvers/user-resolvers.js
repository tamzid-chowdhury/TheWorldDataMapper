const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcryptjs');
const User = require('../models/user-model');
const tokens = require('../utils/tokens');

module.exports = {
	Query: {
		/** 
		 	@param 	 {object} req - the request object containing a user id
			@returns {object} the user object on success and an empty object on failure 
		**/
		getCurrentUser: async (_, __, { req }) => {
			const _id = new ObjectId(req.userId);
			if(!_id) { return({}) }
			const found = await User.findOne(_id);
			if(found) return found;
		},
	},
	Mutation: {
		/** 
			@param 	 {object} args - login info
			@param 	 {object} res - response object containing the current access/refresh tokens  
			@returns {object} the user object or an object with an error message
		**/
		login: async (_, args, { res }) => {	
			const { email, password } = args;

			const user = await User.findOne({email: email});
			if(!user) return({});

			const valid = await bcrypt.compare(password, user.password);
			if(!valid) return({});
			// Set tokens if login info was valid
			const accessToken = tokens.generateAccessToken(user);
			const refreshToken = tokens.generateRefreshToken(user);
			res.cookie('refresh-token', refreshToken, { httpOnly: true , sameSite: 'None', secure: true}); 
			res.cookie('access-token', accessToken, { httpOnly: true , sameSite: 'None', secure: true}); 
			return user;
		},
		/** 
			@param 	 {object} args - registration info
			@param 	 {object} res - response object containing the current access/refresh tokens  
			@returns {object} the user object or an object with an error message
		**/
		register: async (_, args, { res }) => {
            const { email, password, name } = args;
			const alreadyRegistered = await User.findOne({email: email});
			if(alreadyRegistered) {
				console.log('User with that email already registered.');
				return(new User({
					_id: '',
					name: '',
					email: 'already exists', 
					password: ''}));
			}
			const hashed = await bcrypt.hash(password, 10);
			const _id = new ObjectId();
			const user = new User({
				_id: _id,
				name: name,
				email: email, 
				password: hashed
			})
            const saved = await user.save();
			return user;
		},
				/** 
			@param 	 {object} args - updated info
			@param 	 {object} res - response object containing the current access/refresh tokens  
			@returns {object} the user object or an object with an error message
		**/
		update: async (_, args, { req, res }) => {
			const {email, password, name} = args;
			const _id = new ObjectId(req.userId);
	
			const current = await User.findOne(_id);
			const alreadyRegistered = await User.findOne({email: email});
			// if(current.email == email && current.password == password && current.name == name){
			// 	console.log("Nothing was updated. Try again.")
			// 	return(new User({
			// 		_id: '',
			// 		name: '',
			// 		email: 'nothing updated', 
			// 		password: ''}));
			// }
			if(alreadyRegistered && alreadyRegistered.email != current.email) {
				console.log('User with that email already registered.');
				return(new User({
					_id: '',
					name: '',
					email: 'already exists', 
					password: ''}));
			}
			const hashed = await bcrypt.hash(password, 10);
			const user = new User({
				_id: _id,
				name: name,
				email: email, 
				password: hashed
			})
			const updated = await User.updateOne({_id:_id}, user)
			return user;
		},
		/** 
		@param 	 {object} res - response object containing the current access/refresh tokens  
		@returns {boolean} true 
		**/
		logout:(_, __, { res }) => {
			res.clearCookie('refresh-token');
			res.clearCookie('access-token');
			return true;
		}
	}
}
