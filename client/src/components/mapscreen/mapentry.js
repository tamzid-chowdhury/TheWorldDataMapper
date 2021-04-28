import React, { useState }  from 'react';
import { WButton, WInput, WCol } from 'wt-frontend';
import WRow from 'wt-frontend/build/components/wgrid/WRow';
import Delete from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DeleteMap from '../modals/DeleteMap';
import { useMutation }    	from '@apollo/client';
import * as mutations from '../../cache/mutations';


const MapEntry = (props) => {
    const [showDeleteModal, toggleShowDeleteModal] = useState(false);
    const [DeleteRootMap] = useMutation(mutations.DELETE_MAP);

    const setShowDeleteModal = () => {
        toggleShowDeleteModal(!showDeleteModal);
    };

    const handleDeleteRootMap = async () => {
        let _id = props.region._id;
        console.log(_id)
        const { loading, error, data } = await DeleteRootMap({ variables: {_id}  });
        if (loading) {};
        if (error) {console.log(error)}
		if (data) {
			props.refetchUserMaps();	
		};
    }

 
    
    return (
        <div>
        <WRow>
            <WCol size = "10" className="map-entries">
                <WButton className="map-entries-button"  wType="transparent" hoverAnimation="darken" clickAnimation="ripple-dark">
                    {props.region.name}
                </WButton>
            </WCol>
            <WCol size = "1" className="trash-icon-container">
                <EditIcon className="trash-icon" style={{ fontSize: 40 }}/>
            </WCol>
            <WCol size = "1" className="trash-icon-container">
                <Delete className="trash-icon" style={{ fontSize: 40 }} onClick={setShowDeleteModal}/>
            </WCol>
        </WRow>
        
        {
            showDeleteModal && (<DeleteMap setShowDeleteModal={setShowDeleteModal} handleDeleteRootMap={handleDeleteRootMap} name={props.region.name}/>)
        }

        </div>
        
    );
};

export default MapEntry;