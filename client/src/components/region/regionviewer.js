import React, {useState} from 'react';
import { Redirect, useParams } from 'react-router-dom';
import {WCard, WCHeader, WCMedia, WCContent, WCFooter} 	from 'wt-frontend';
import {WLayout, WLHeader, WLMain} from 'wt-frontend';
import {WButton} from 'wt-frontend';
import Logo from '../navbar/Logo'
import * as mutations from '../../cache/mutations';
import * as queries from '../../cache/queries';
import { useMutation, useApolloClient, useQuery }     from '@apollo/client';
import UpdateAccount from '../modals/UpdateAccount';
import earth from '../../assets/earth.jpg';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import LandmarkList from './landmarklist'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import EditIcon from '@material-ui/icons/Edit';
import ChangeParentModal from '../modals/ChangeParentModal'
import {ChangeParentRegion_Transaction} from '../../utils/jsTPS'

const RegionViewer = (props) => {

    const keyCombination = (e, callback) => {
		if(e.key === 'z' && e.ctrlKey) {
			if(props.tps.hasTransactionToUndo()) {
				tpsUndo();
			}
		}
		else if (e.key === 'y' && e.ctrlKey) { 
			if(props.tps.hasTransactionToRedo()) {
				tpsRedo();
			}
		}
	}
    document.onkeydown = keyCombination;

    let flagName = props.region.name + " Flag.png"
    let flagSource = props.images[flagName]

    
    let parentRegion = null; 
    let subregions = [];
    let siblingRegions = [];
    let parentSiblingRegions = null;
    let numOfSubregions = 0; 
    let prevSiblingID = null; 
    let nextSiblingID = null; 

    const [showChangeParent, toggleShowChangeParent] 	= useState(false);
    const [refreshSelected, toggleRefreshSelected] = useState(false);

    const setShowChangeParent = () => {
        toggleShowChangeParent(!showChangeParent);
    };

    const [parentRegionSelected, toggleParentRegionSelected] = useState(false);
    const [prevSiblingSelected, togglePrevSiblingSelected] = useState(false);
    const [nextSiblingSelected, toggleNextSiblingSelected] = useState(false);
    const [canUndo, setCanUndo] = useState(props.tps.hasTransactionToUndo());
    const [canRedo, setCanRedo] = useState(props.tps.hasTransactionToRedo());
    
    const [ChangeParentRegion] = useMutation(mutations.CHANGE_PARENT_REGION);
    
    const { loading, error, data, refetch: regionRefetch } = useQuery(queries.GET_REGION_BY_ID, { variables: {id:props.region.parentRegion} });
    const {loading:loading1, error:error1, data:data1, refetch: subregionRefetch} = useQuery(queries.GET_ALL_SUBREGIONS, { variables: {id: props.region._id, sortRule:props.region.sortRule, sortDirection:props.region.sortDirection} });

    const {data:data2, refetch: parentRegionRefetch} = useQuery(queries.GET_ALL_SIBLINGS, { variables: {id: props.region.parentRegion} })

    const {data:data3, refetch: parentSiblingRegionRefetch} = useQuery(queries.GET_ALL_PARENT_SIBLINGS, { variables: {id: props.region.parentRegion} });

    if(error) { console.log(error); }
	if(loading) { return <div></div> }
	if(data) { 
            parentRegion = data.getRegionById; 
    }

    if(error1) {console.log(error1)}
    if(loading1) {}
    if(data1){
            subregions = data1.getAllSubregions; 
            numOfSubregions = subregions.length;
    }

    if(data2){
        siblingRegions = data2.getAllSiblings;
        const index = siblingRegions.findIndex(region => region._id == props.region._id);
        
        if(index > 0){
            prevSiblingID = siblingRegions[index-1]._id; 
        }

        if(index < siblingRegions.length - 1){
            nextSiblingID = siblingRegions[index+1]._id;
        }

    }

    if(data3){
        parentSiblingRegions = data3.getAllParentSiblings;
    }

    const handleNavigateToParentRegion = () => {
        toggleParentRegionSelected(true);
    }

    const handleNavigateToPrevSibling = () => {
        togglePrevSiblingSelected(true);
    }

    const handleNavigateToNextSibling = () => {
        toggleNextSiblingSelected(true);
    }

    const handleRefreshSelected = () => {
        toggleRefreshSelected(true);
    }

    if(parentRegionSelected){
        props.tps.clearAllTransactions();
        return <Redirect to={ {pathname: '/regionscreen/' + props.region.parentRegion}}/>
    }

    if(prevSiblingSelected){
        props.tps.clearAllTransactions();
        return <Redirect to={ {pathname: '/landmarkscreen/' + prevSiblingID}}/>
    }

    if(nextSiblingSelected){
        props.tps.clearAllTransactions();
        return <Redirect to={ {pathname: '/landmarkscreen/' + nextSiblingID}}/>
    }

    if(refreshSelected){
        return <Redirect to={ {pathname: '/landmarkscreen/' + props.region._id}}/>
    }
    
    const tpsUndo = async () => {
        const ret = await props.tps.undoTransaction();
		if(ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
    }
    

	const tpsRedo = async () => {
		const ret = await props.tps.doTransaction();
		if(ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
    }
    
    const clickDisabled = () => { };

    const undoOptions = {
        className: !canUndo ? ' undo-button-disabled region-viewer-undo' : 'undo-button region-viewer-undo',
        onClick: !canUndo  ? clickDisabled : tpsUndo
    }

    const redoOptions = {
        className: !canRedo ? ' undo-button-disabled region-viewer-redo' : 'undo-button region-viewer-redo',
        onClick: !canRedo  ? clickDisabled : tpsRedo
    }

    const changeParentRegion = (newParentRegion) => {
        let regionID = props.region._id;
        let newParentRegionID = newParentRegion._id;
        let prevParentRegionID = parentRegion._id; 

        let transaction = new ChangeParentRegion_Transaction(regionID, newParentRegionID, prevParentRegionID, ChangeParentRegion, handleRefreshSelected)
        props.tps.addTransaction(transaction);
        tpsRedo()     
    }


    return (
    <>
    <div className="region-viewer-picture">
        <UndoIcon {...undoOptions} fontSize="large"/> 
        <RedoIcon {...redoOptions} fontSize="large"/> 

        {
                    flagSource === undefined ? <img src={earth} width="600" height="350"></img>: <img src={flagSource} width="600" height="350"></img> 
        }
    </div>

    <div className="sibling-arrows">
        {
            prevSiblingID && <ArrowBackIcon fontSize="large"className="left-arrow" onClick={handleNavigateToPrevSibling}/>
        }
        {
            nextSiblingID && <ArrowForwardIcon fontSize="large" className="right-arrow" onClick={handleNavigateToNextSibling}/>
        }
    </div>

    <div className="region-viewer-info">
        <div className="region-viewer-info-entry">
            Region Name:&nbsp;&nbsp;&nbsp;{props.region.name}
        </div> 
        <div className="region-viewer-info-parentregion">
            <div>Parent Region:</div>
            <div className="parent-region-navigator" onClick={handleNavigateToParentRegion}>{parentRegion.name}</div>
            {
                parentSiblingRegions && parentSiblingRegions.length > 1 &&  <div> <EditIcon className="change-parent" onClick={setShowChangeParent}/> </div>
            }
            {
                showChangeParent && <ChangeParentModal parentSiblingRegions={parentSiblingRegions} region={props.region} 
                setShowChangeParent={setShowChangeParent} changeParentRegion={changeParentRegion}/>
            }
        </div>
        <div className="region-viewer-info-entry">
            Region Capital:&nbsp;&nbsp;&nbsp;{props.region.capital}
        </div>
        <div className="region-viewer-info-entry">Region Leader:&nbsp;&nbsp;&nbsp;{props.region.leader}
        </div>
        <div className="region-viewer-info-entry">Number of Sub Regions:&nbsp;&nbsp;&nbsp;{numOfSubregions}
        </div>
    </div>

    <WCard wLayout="content-footer" style={{ width: "600px", height: "700px" }} className="region-viewer-landmarks">
        <WCContent style={{ backgroundColor: "black", color:"white"}}>
            <div className="landmarks-list-title">
                Region Landmarks:
                <LandmarkList subregions={subregions} /> 
            </div>
        </WCContent>
        <WCFooter style={{ backgroundColor: "lightgrey" }}>

        </WCFooter>
    </WCard>
    
    </>

    )
}

export default RegionViewer; 