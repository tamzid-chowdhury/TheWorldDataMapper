const { model, Schema, ObjectId, Mongoose } = require('mongoose');

const landmarkSchema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		owner: {
			type: String
		}        
	},
	{ timestamps: true }
);

const Landmark = model('Landmark', landmarkSchema);
module.exports = Landmark