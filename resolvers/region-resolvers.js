const ObjectId = require('mongoose').Types.ObjectId;
const Region = require('../models/region-model')
const Landmark = require('../models/landmark-model')

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
			const {_id, sortRule, sortDirection} = args;
			const direction = sortDirection == 1 ? "ascending": "descending";
			const parentRegion = new ObjectId(_id);

			let regions = null; 

			if (sortRule == "name") {
				regions = await Region.find({parentRegion:parentRegion}).sort({name: direction});
			}
			else if(sortRule == "capital"){
				regions = await Region.find({parentRegion:parentRegion}).sort({capital: direction});
			}
			else {
				regions = await Region.find({parentRegion:parentRegion}).sort({leader: direction});
			}
			return regions; 
		},

		getAllSiblings: async (_,args) => {
			const {_id} = args;
			const region = await Region.findById(_id);

			const direction = region.sortDirection == 1 ? "ascending": "descending";
			const sortRule = region.sortRule

			let regions = null; 

			if (sortRule == "name") {
				regions = await Region.find({parentRegion:_id}).sort({name: direction});
			}
			else if(sortRule == "capital"){
				regions = await Region.find({parentRegion:_id}).sort({capital: direction});
			}
			else {
				regions = await Region.find({parentRegion:_id}).sort({leader: direction});
			}
			return regions; 
		},

		getAllParentSiblings: async (_,args) => {
			const {_id} = args;
			const region = await Region.findById(_id);

			const parentRegion = await Region.findById(region.parentRegion)

			const direction = parentRegion.sortDirection == 1 ? "ascending": "descending";
			const sortRule = parentRegion.sortRule

			let regions = null; 

			if (sortRule == "name") {
				regions = await Region.find({parentRegion:parentRegion._id}).sort({name: direction});
			}
			else if(sortRule == "capital"){
				regions = await Region.find({parentRegion:parentRegion._id}).sort({capital: direction});
			}
			else {
				regions = await Region.find({parentRegion:parentRegion._id}).sort({leader: direction});
			}
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
		},

		getChildLandmarks: async (_,args) => {
			const {_id} = args;

			subregions = await Region.find({parentRegion:_id})


			landmarks = []


			subregions.map(subregion => {
				subregion.landmarks.map(landmark => {
					landmarks.push(landmark)
				})
			})
			
			return landmarks; 
		},
		getRegionNameByLandmark: async (_,args) => {
			const {owner} = args;

			region = await Region.findById(owner);

			return region.name; 
		}
    },
    
	Mutation: {

		addRootRegion: async (_,args,{req}) => {
            const {name} = args
            owner = new ObjectId(req.userId);
            
			const newRegion = new Region({
				_id: new ObjectId(),
				name: name,
				owner: owner,
				sortRule: "name",
				sortDirection: 1
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
				name: "None",
				capital: "None",
				leader: "None",
				flag: "None",
				landmarks: [],
				parentRegion: parentRegion,
				sortRule: "name",
				sortDirection: 1
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
				parentRegion: parentRegion,
				sortRule: subregion.sortRule,
				sortDirection: subregion.sortDirection
			});
			
			const create = await newRegion.save();

			return create; 
		},

		editSubregion: async (_,args) => {
			const {regionID, field, newValue} = args;

			const _id = new ObjectId(regionID);
			const updated = await Region.updateOne({_id: _id}, {[field]: newValue});

			if(updated){
				return true; 
			}
		},

		sortSubregion: async (_,args) => {
			const {regionID, newName} = args;

			let newSortName = newName;
			let newSortDirection = 1; 
			
			const _id = new ObjectId(regionID);

			const region = await Region.findOne({_id: _id});
			const prevSortRule = region.sortRule;
			const prevSortDirection = region.sortDirection;

			if(newSortName === prevSortRule){
				newSortDirection = prevSortDirection * -1;
			}
			
			region.sortRule = newSortName; 
			region.sortDirection = newSortDirection

			const saved = region.save()

			if(saved){
				return region; 
			}
		},

		undoSortSubregion: async (_,args) => {
			const {regionID, prevName, prevDirection} = args;


			const _id = new ObjectId(regionID);
			const region = await Region.findOne({_id: _id});


			region.sortRule = prevName; 
			region.sortDirection = prevDirection

			const saved = region.save()

			if(saved){
				return region; 
			}
		},

		changeParentRegion: async (_,args) => {
			const {regionID, newParentRegionID} = args;

			const _id = new ObjectId(regionID);

			const region = await Region.findOne({_id: _id});

			const updatedParentRegionID = new ObjectId(newParentRegionID)

			region.parentRegion = updatedParentRegionID;

			const saved = region.save();

			if(saved){
				return true; 
			}
		},
		
		addLandmark: async (_,args) => {
			const {regionID, newLandmark} = args;

			const _id = new ObjectId(regionID);

			const landmarkID = new ObjectId();

			const landmarkToAdd = new Landmark({
				_id: landmarkID,
				name: newLandmark,
				owner: _id
			});

			const region = await Region.findOne({_id: _id});

			const landmarks = region.landmarks

			landmarks.push(landmarkToAdd);

			region.landmarks = landmarks;

			const saved = region.save();
			
			return landmarkID.toString(); 
			
		},

		addLandmarkWithID: async (_,args) => {
			const {regionID, landmarkID, landmarkName} = args;

			const _id = new ObjectId(regionID);

			const landmarkToAdd = new Landmark({
				_id: new ObjectId(landmarkID),
				name: landmarkName,
				owner: _id
			});

			const region = await Region.findOne({_id: _id});

			const landmarks = region.landmarks

			landmarks.push(landmarkToAdd);

			region.landmarks = landmarks;

			const saved = region.save();
			
			return true; 
			
		},

		deleteLandmark: async (_,args) => {
			const {regionID, landmarkID} = args;

			const _id = new ObjectId(regionID);

			const region = await Region.findOne({_id: _id});

			let landmarks = region.landmarks

			landmarks = landmarks.filter(landmark => landmark._id.toString() !== landmarkID);

			region.landmarks = landmarks;

			const saved = region.save();
			
			return saved; 
			
		},

		editLandmark: async (_,args) => {
			const {regionID, landmarkID, newLandmarkName} = args;

			const _id = new ObjectId(regionID);

			const region = await Region.findOne({_id: _id});

			let landmarks = region.landmarks


			landmarks = landmarks.filter(landmark => landmark._id.toString() !== landmarkID);

			const landmarkToAdd = new Landmark({
				_id: new ObjectId(landmarkID),
				name: newLandmarkName,
				owner: regionID
			});

			landmarks.push(landmarkToAdd);

			region.landmarks = landmarks;

			const saved = region.save();

			

			return true; 
			
		},
	}

}