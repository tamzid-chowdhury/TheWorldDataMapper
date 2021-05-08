import React, {useState} from 'react';
import { Redirect, useParams } from 'react-router-dom';
import Logo from '../navbar/Logo'
import * as mutations from '../../cache/mutations';
import * as queries from '../../cache/queries';
import { useMutation, useApolloClient, useQuery }     from '@apollo/client';
import WInput from 'wt-frontend/build/components/winput/WInput';
import CloseIcon from '@material-ui/icons/Close';
import DeleteLandmark from '../modals/DeleteLandmark'

const LandmarkList = (props) => { 
    return (
        <>
        {
            props.region.landmarks.map(landmark => (
                <LandmarkEntry key={landmark._id} landmark={landmark} region={props.region} 
                handleDeleteLandmark={props.handleDeleteLandmark} handleEditLandmark={props.handleEditLandmark}/>
            ))
        }
        </>
    )
}

const LandmarkEntry = (props) => {
    const [showDeleteLandmark, toggleShowDeleteLandmark] = useState(false)
    const [showInput, toggleShowInput] = useState(false)
    const [input, setInput] = useState('');

    const handleDeleteLandmark = () => {
        props.handleDeleteLandmark(props.region._id, props.landmark._id, props.landmark)
    }

    const setShowDeleteLandmark = () => { 
        toggleShowDeleteLandmark(!showDeleteLandmark)
    }

    const setShowInput = () => {
        setInput('')
        toggleShowInput(!showInput);
    }

    const updateInput = (e) => {
        const updated = e.target.value;
        setInput(updated);
    }

    const handleEditLandmark = () => {
        let newLandmarkName = input;
        props.handleEditLandmark(props.region._id, props.landmark._id, props.landmark.name, newLandmarkName)
        setShowInput()
    }

    return (
        <div className="landmark-entry">
            <div className="delete-landmark"><CloseIcon  onClick={setShowDeleteLandmark}/></div>

            {
                showInput == false ? <div className="landmark-entry-text" onClick={setShowInput}>{props.landmark.name}</div> :
                <input className="landmark-entry-input" autoFocus onBlur={handleEditLandmark} onChange={updateInput}></input>
            }


            {
                showDeleteLandmark && <DeleteLandmark handleDeleteLandmark={handleDeleteLandmark} setShowDeleteLandmark={setShowDeleteLandmark}/>
            }
        </div>
    )

}

export default LandmarkList; 