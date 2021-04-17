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
			type: String,
			required: true
		},
		leader: {
			type: String,
			required: true
        },
        flag: {
            type: String, 
            required: true
        }, 
        landmarks:{
            type: [String]
        },
        parentRegion: {
            type: Schema.Types.ObjectId,
            ref: 'Region'
        }
        
	},
	{ timestamps: true }
);

const Region = model('Region', regionSchema);
module.exports = Region