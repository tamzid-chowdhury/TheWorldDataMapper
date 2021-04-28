import React, { useState } 	from 'react';
import { useMutation }    	from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const DeleteMap = (props) => {

    

    

	return (
		<WModal className="login-modal"  cover="true" visible="true" animation="fade-in">
			<WMHeader  className="modal-header">
				Delete {props.name} Map?
			</WMHeader>
            
			
			<WMFooter className='modal-footer'>
                <WRow className='modal-col-gap'>
                    <WCol size="6">
						<WButton wType="ghost" className="modal-button" span hoverAnimation="fill" clickAnimation="ripple-dark" 
						color="colored" raised="true" onClick={() => props.handleDeleteRootMap()} >
                            Confirm
                        </WButton>
                    </WCol>
                    <WCol size="6">
                        <WButton wType ="ghost" className="modal-button" span hoverAnimation="fill" 
                        clickAnimation="ripple-dark" color="colored" raised="true" onClick={() => props.setShowDeleteModal()}>
                            Cancel
                        </WButton>
                    </WCol>
                </WRow>

			</WMFooter>
			
		</WModal>
	);
}

export default DeleteMap;
