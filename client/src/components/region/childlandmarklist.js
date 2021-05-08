import React, {useState} from 'react';
import { Redirect, useParams } from 'react-router-dom';
import Logo from '../navbar/Logo'
import * as mutations from '../../cache/mutations';
import * as queries from '../../cache/queries';
import { useMutation, useApolloClient, useQuery }     from '@apollo/client';
import WInput from 'wt-frontend/build/components/winput/WInput';
import CloseIcon from '@material-ui/icons/Close';
import DeleteLandmark from '../modals/DeleteLandmark'

const ChildLandmarkList = (props) => { 
    return (
        <>
        {
            props.childLandmarks.map(landmark => (
                <ChildLandmarkEntry key={landmark._id} landmark={landmark}/>
            ))
        }
        </>
    )
}

const ChildLandmarkEntry = (props) => {

    const { loading, error, data } = useQuery(queries.GET_REGION_NAME_BY_LANDMARK, { variables: {owner:props.landmark.owner} });
    let regionName = null; 

    if(error) { console.log(error); }
	if(loading) { return <div></div> }
	if(data) { 
            regionName = data.getRegionNameByLandmark; 
            console.log(regionName)
    }


    return (
        <div className="child-landmark-entry">
                <div>{props.landmark.name}&nbsp;  - &nbsp; {regionName}</div> 
        </div>
    )

}

export default ChildLandmarkList; 