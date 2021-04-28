import React, { useState }  from 'react';
import { WButton, WInput, WCol } from 'wt-frontend';
import WRow from 'wt-frontend/build/components/wgrid/WRow';
import Delete from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DeleteMap from '../modals/DeleteMap';
import EditMapName from '../modals/EditMapName';
import { useMutation }    	from '@apollo/client';
import * as mutations from '../../cache/mutations';


const MapEntry = (props) => {
    const [showDeleteModal, toggleShowDeleteModal] = useState(false);
    const [showEditNameModal, toggleShowEditNameModal] = useState(false);

    const [DeleteRootMap] = useMutation(mutations.DELETE_MAP);
    const [EditRootMapName] = useMutation(mutations.EDIT_MAP_NAME);

    const setShowDeleteModal = () => {
        toggleShowDeleteModal(!showDeleteModal);
        toggleShowEditNameModal(false);
    };

    const setShowEditNameModal = () => {
        toggleShowDeleteModal(false);
        toggleShowEditNameModal(!showEditNameModal);
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

    const handleEditMapName = async (name) => {
        let _id = props.region._id;
        const { loading, error, data } = await EditRootMapName({ variables: {_id, name}  });
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
                <EditIcon className="trash-icon" style={{ fontSize: 40 }} onClick={setShowEditNameModal}/>
            </WCol>
            <WCol size = "1" className="trash-icon-container">
                <Delete className="trash-icon" style={{ fontSize: 40 }} onClick={setShowDeleteModal}/>
            </WCol>
        </WRow>
        
        {
            showDeleteModal && (<DeleteMap setShowDeleteModal={setShowDeleteModal} handleDeleteRootMap={handleDeleteRootMap} name={props.region.name}/>)
        }

        {
            showEditNameModal && (<EditMapName setShowEditNameModal={setShowEditNameModal} handleEditMapName={handleEditMapName} name={props.region.name}/>)
        }

        </div>
        
    );
};

export default MapEntry;