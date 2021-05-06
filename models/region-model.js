const { model, Schema, ObjectId, Mongoose } = require('mongoose');

const regionSchema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		capital: {
			type: String
		},
		leader: {
			type: String
        },
        flag: {
            type: String
        }, 
        landmarks:{
            type: [String]
		},
		owner: {
			type: String
		},
        parentRegion: {
            type: ObjectId,
            ref: 'Region'
		},
		sortRule: {
			type: String, 
			required: true
		},
		sortDirection: {
			type: Number, 
			required: true
		}
        
	},
	{ timestamps: true }
);

const Region = model('Region', regionSchema);
module.exports = Region