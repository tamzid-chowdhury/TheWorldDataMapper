import React, { useState } 	from 'react';
import { useMutation }    	from '@apollo/client';
import { LOGIN }			from '../../cache/mutations';
import { Redirect } from 'react-router-dom';
import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const EditMapName = (props) => {
	const [name, setName] = useState('');

	const updateInput = (e) => {
		const {value} = e.target;
        setName(value);
    }
    
    const handleEditMapName = () => {
        props.handleEditMapName(name);
        props.setShowEditNameModal();
    }

    

	return (
		<WModal className="login-modal"  cover="true" visible="true" animation="fade-in">
			<WMHeader  className="modal-header" onClose={() => props.setShowEditNameModal()}>
				Edit Map Name
			</WMHeader>
			<WMMain className="modal-main">

				<WInput 
					className="modal-input" onBlur={updateInput} name="name" labelAnimation="up" 
					barAnimation="solid" labelText="Name" wType="outlined" inputType="text" defaultValue={props.name}
				/>
							

			</WMMain>
            
			
			<WMFooter className='modal-footer'>
                <WRow className='modal-col-gap'>
                    <WCol size="6">
						<WButton wType="ghost" className="modal-button" span hoverAnimation="fill" clickAnimation="ripple-dark" 
						color="colored" raised="true" onClick={handleEditMapName}> 
                            Edit Map Name
                        </WButton>
                    </WCol>
                    <WCol size="6">
                        <WButton wType ="ghost" className="modal-button" span hoverAnimation="fill" 
                        clickAnimation="ripple-dark" color="colored" raised="true" onClick={() => props.setShowEditNameModal()}>
                            Cancel
                        </WButton>
                    </WCol>
                </WRow>

			</WMFooter>
			
		</WModal>
	);
}

export default EditMapName;
