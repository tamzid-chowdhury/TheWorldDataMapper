const { model, Schema, ObjectId } = require('mongoose');

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
        landmarks: 
            [
                { 
                    type: Schema.Types.ObjectId, 
                    ref: 'Landmarks' 
                }
            ],
        regionList: 
            [
                { 
                    type: Schema.Types.ObjectId, 
                    ref: 'Region' 
                }]
        
	},
	{ timestamps: true }
);

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
    region: {
        type: Schema.Types.ObjectId,
        ref: 'Region'
    }

}); 

const Region = model('Region', regionSchema);
module.exports = User