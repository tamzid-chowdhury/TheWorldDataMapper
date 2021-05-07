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
                <LandmarkEntry landmark={landmark} region={props.region}/>
            ))
        }
        </>
    )
}

const LandmarkEntry = (props) => {

    return (
        <div className="landmark-entry">
            <div className="delete-landmark"><CloseIcon /></div>
            <div className="landmark-entry-text">{props.landmark}</div>
        </div>
    )

}

export default LandmarkList; 