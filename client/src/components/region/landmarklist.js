import React, {useState} from 'react';
import { Redirect, useParams } from 'react-router-dom';
import Logo from '../navbar/Logo'
import * as mutations from '../../cache/mutations';
import * as queries from '../../cache/queries';
import { useMutation, useApolloClient, useQuery }     from '@apollo/client';
import WButton from 'wt-frontend/build/components/wbutton/WButton';
import CloseIcon from '@material-ui/icons/Close';


const LandmarkList = (props) => { 
    return (
        <>
        {
            props.region.landmarks.map(landmark => (
                <LandmarkEntry key={landmark._id} landmark={landmark} region={props.region} handleDeleteLandmark={props.handleDeleteLandmark}/>
            ))
        }
        </>
    )
}

const LandmarkEntry = (props) => {

    const handleDeleteLandmark = () => {
        props.handleDeleteLandmark(props.region._id, props.landmark._id, props.landmark)
    }

    return (
        <div className="landmark-entry">
            <div className="delete-landmark"><CloseIcon  onClick={handleDeleteLandmark}/></div>
            <div className="landmark-entry-text">{props.landmark.name}</div>
        </div>
    )

}

export default LandmarkList; 