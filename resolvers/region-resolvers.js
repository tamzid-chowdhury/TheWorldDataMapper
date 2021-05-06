const ObjectId = require('mongoose').Types.ObjectId;
const Region = require('../models/region-model')

module.exports = {
	Query: {

		getRootRegions: async (_, __, { req }) => {
			const _id = new ObjectId(req.userId);
			if(!_id) { return([])};
			const regions = await Region.find({owner: _id}).sort({updatedAt: 'descending'});
			if(regions) {
				return (regions);
			} 

		},

		getRegionById: async (_,args) => {
			const {_id} = args;
			const region = await Region.findById(_id);
			return region; 
		},

		getAllSubregions: async (_,args) => {
			const {_id} = args;
			const parentRegion = new ObjectId(_id);
			const regions = await Region.find({parentRegion:parentRegion}).sort({_id: 'descending'});
			return regions; 
		},

		getAncestorRegions: async (_,args) => {
			const {_id} = args;

			let regions = [];

			const region = await Region.findById(_id); //current region -> we want to find its ancestorregions 
			let nextAncestorRegion = await Region.findById(region.parentRegion);

			if(nextAncestorRegion != null){
				regions.push(nextAncestorRegion);
			}

			while(nextAncestorRegion != null){
				nextAncestorRegion = await Region.findById(nextAncestorRegion.parentRegion);
				if(nextAncestorRegion != null){
					regions.push(nextAncestorRegion);
				}
			}
			
			regions = regions.reverse()
			
			return regions; 
		}
    },
    
	Mutation: {

		addRootRegion: async (_,args,{req}) => {
            const {name} = args
            owner = new ObjectId(req.userId);
            
			const newRegion = new Region({
				_id: new ObjectId(),
				name: name,
				owner: owner
            });
            
			const create = await newRegion.save();
			if(create) {
				console.log(newRegion)
				return newRegion;
			}
		},

		deleteRootRegion: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const deleted = await Region.deleteOne({_id: objectId});
			if(deleted) return true;
			else return false;
		},

		editMapName: async (_, args) => {
			const {_id, name} = args;
			const objectId = new ObjectId(_id);
			const updatedRegion = await Region.findOne({_id: objectId});
			updatedRegion.name = name; 
			updatedRegion.save()
			return updatedRegion;
		},

		addNewSubregion: async (_,args) => {
			const {_id} = args
			
			parentRegion = new ObjectId(_id);
			
			const newRegion = new Region({
				_id: new ObjectId(),
				name: "Untited Region",
				capital: "None",
				leader: "None",
				flag: "None",
				landmarks: [],
				parentRegion: parentRegion
            });
            
			const create = await newRegion.save();

			return create; 
		},

		deleteSubregion: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);

			const toDelete = await Region.findOne({_id: objectId});
			const deleted = await Region.deleteOne({_id: objectId});
			
			return toDelete; 
		},

		addSubregion: async (_,args) => {
			const {subregion} = args;
			
			const regionID = new ObjectId(subregion._id);
			const parentRegion = new ObjectId(subregion.parentRegion);

			const newRegion = new Region({
				_id: regionID,
				name: subregion.name,
				capital: subregion.capital,
				leader: subregion.leader,
				flag: subregion.flag,
				landmarks: subregion.landmarks,
				parentRegion: parentRegion
			});
			
			const create = await newRegion.save();

			return create; 
		}
		
	}

}