import React, { useState } 	from 'react';
import { useMutation }    	from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const ChangeParentModal = (props) => {

    const handleChangeParent = (parentRegion) => {
        if(parentRegion._id != props.region.parentRegion){
            props.changeParentRegion(parentRegion)
            props.setShowChangeParent()
        }
        else{
            props.setShowChangeParent()
        }
    }


	return (
		<WModal className="change-parent-modal"  cover="true" visible="true" animation="fade-in">
            <WMHeader  className="parent-modal-header" style={{ fontSize: '22px'}} onClose={() => props.setShowChangeParent()}>
				Change {props.region.name}'s Parent Region
			</WMHeader>
            
			
			<WMFooter className='parent-modal-footer'>
                {
                    props.parentSiblingRegions.map(parentRegion => (

                        <WRow className='modal-col-gap' style={{paddingBottom: '20px'}}>
                            <WButton className="parent-modal-button" wType="ghost" className="modal-button" span hoverAnimation="fill" clickAnimation="ripple-dark" 
                            color="colored" raised="true"style={{ width: '300px'}} onClick={(e) => {(handleChangeParent(parentRegion))}}>
                                {parentRegion.name}
                            </WButton>
                        </WRow>

                    )) 
                }

			</WMFooter>
			
		</WModal>
	);
}

export default ChangeParentModal;
