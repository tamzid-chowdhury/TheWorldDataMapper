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

const RegionViewer = (props) => {
    let parentRegion = null; 

    const [parentRegionSelected, toggleParentRegionSelected] = useState(false);
    
    const { loading, error, data, refetch } = useQuery(queries.GET_REGION_BY_ID, { variables: {id:props.region.parentRegion} });

    if(error) { console.log(error); }
	if(loading) { return <div></div> }
	if(data) { 
            parentRegion = data.getRegionById; 
    }

    const handleNavigateToParentRegion = () => {
        toggleParentRegionSelected(true);
    }

    if(parentRegionSelected){
        return <Redirect to={ {pathname: '/regionscreen/' + props.region.parentRegion}}/>
    }
    

    return (
    <>
    <div className="region-viewer-picture">
        <UndoIcon className="region-viewer-undo" fontSize="large"/> 
        <RedoIcon className="region-viewer-redo" fontSize="large"/> 
        <img src={earth} width="600" height="350"></img>
    </div>
    
    <div className="region-viewer-info">
        <div className="region-viewer-info-entry">
            Region Name:&nbsp;&nbsp;&nbsp;{props.region.name}
        </div> 
        <div className="region-viewer-info-parentregion">
            <div>Parent Region:</div>
            <div className="parent-region-navigator" onClick={handleNavigateToParentRegion}>{parentRegion.name}</div>
        </div>
        <div className="region-viewer-info-entry">
            Region Capital:&nbsp;&nbsp;&nbsp;{props.region.capital}
        </div>
        <div className="region-viewer-info-entry">Region Leader:&nbsp;&nbsp;&nbsp;{props.region.leader}
        </div>
        <div className="region-viewer-info-entry">Number of Sub Regions:
        </div>
    </div>

    <WCard wLayout="content-footer" style={{ width: "600px", height: "700px" }} className="region-viewer-landmarks">
        <WCContent style={{ backgroundColor: "black", color:"white"}}>
            <div className="landmarks-list-title">
                Region Landmarks:
            </div>
        </WCContent>
        <WCFooter style={{ backgroundColor: "lightgrey" }}>

        </WCFooter>
    </WCard>
    
    </>

    )
}

export default RegionViewer; 