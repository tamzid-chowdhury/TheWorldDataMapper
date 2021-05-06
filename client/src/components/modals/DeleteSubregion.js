import React, { useState } 	from 'react';
import { useMutation }    	from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const DeleteSubregionModal = (props) => {

    const handleDeleteSubRegion = () => {
        props.handleDeleteChildRegion(props.regionToDelete._id);
        props.handleRegionToDelete(null);
    }

	return (
		<WModal className="login-modal"  cover="true" visible="true" animation="fade-in">
			<WMHeader  className="modal-header" style={{ fontSize: '22px'}}>
				Deleting {props.regionToDelete.name} Will Delete All Subregions
			</WMHeader>
            
			
			<WMFooter className='modal-footer'>
                <WRow className='modal-col-gap'>
                    <WCol size="6">
						<WButton wType="ghost" className="modal-button" span hoverAnimation="fill" clickAnimation="ripple-dark" 
						color="colored" raised="true" onClick={() => handleDeleteSubRegion()} >
                            Delete
                        </WButton>
                    </WCol>
                    <WCol size="6">
                        <WButton wType ="ghost" className="modal-button" span hoverAnimation="fill" 
                        clickAnimation="ripple-dark" color="colored" raised="true" onClick={() => props.handleRegionToDelete(null)}>
                            Cancel
                        </WButton>
                    </WCol>
                </WRow>

			</WMFooter>
			
		</WModal>
	);
}

export default DeleteSubregionModal;
