import React, { useState } 	from 'react';
import { UPDATE }			from '../../cache/mutations';
import { useMutation }    	from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const UpdateAccount = (props) => {
	const [input, setInput] = useState({ email: '', password: '', name: ''});
    const [Update] = useMutation(UPDATE);

	
	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
    };
    
    const handleUpdateAccount = async (e) => {
		for (let field in input) {
			if (!input[field]) {
				alert('All fields must be filled out to register');
				return;
			}
        }
        const id = props.user._id; 
		const { loading, error, data } = await Update({ variables: { ...input, id } });
		if (loading) {console.log("loading")};
		if (error) { return `Error: ${error.message}` };
		if (data) {
			if(data.update.email === 'already exists') {
				alert('User with that email already registered');
			}
			// else if(data.update.email === 'nothing updated') {
			// 	alert('No fields were updated. Try again.')
			// }
			else {
                props.fetchUser()
                props.setShowUpdate()
			}

        };
        
    }


	return (
		<WModal className="signup-modal"  cover="true" visible="true" animation="fade-in">
			<WMHeader  className="modal-header" onClose={() => props.setShowUpdate()}>
				Update Account Information
			</WMHeader>
			<WMMain className="modal-main">

				<WInput 
					className="modal-input" onBlur={updateInput} name="name" labelAnimation="up" 
					barAnimation="solid" labelText="Name" wType="outlined" inputType="text" defaultValue={props.user.name}
				/>


				<div className="modal-spacer">&nbsp;</div>

				<WInput 
					className="modal-input" onBlur={updateInput} name="email" labelAnimation="up" 
                    barAnimation="solid" labelText="Email Address" wType="outlined" inputType="text" 
                    defaultValue={props.user.email}
				/>
							
                <div className="modal-spacer">&nbsp;</div>

				<WInput 
					className="modal-input" onBlur={updateInput} name="password" labelAnimation="up" 
					barAnimation="solid" labelText="Password" wType="outlined" inputType="password" 
				/>
			</WMMain>
            
			
			<WMFooter className='modal-footer'>
                <WRow className='modal-col-gap'>
                    <WCol size="6">
                        <WButton wType="ghost" className="modal-button" span hoverAnimation="fill" 
                        clickAnimation="ripple-dark" color="colored" raised="true" onClick={handleUpdateAccount}>
                            Update Account
                        </WButton>
                    </WCol>
                    <WCol size="6">
                        <WButton wType ="ghost" className="modal-button" span hoverAnimation="fill" 
                        clickAnimation="ripple-dark" color="colored" raised="true" onClick={() => props.setShowUpdate()}>
                            Cancel
                        </WButton>
                    </WCol>
                </WRow>

			</WMFooter>
			
		</WModal>
	);
}

export default UpdateAccount;
