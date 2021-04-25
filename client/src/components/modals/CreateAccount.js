import React, { useState } 	from 'react';
import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const CreateAccount = (props) => {
	const [input, setInput] = useState({ email: '', password: '', name: ''});

	
	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	};


	return (
		<WModal className="signup-modal"  cover="true" visible="true">
			<WMHeader  className="modal-header" onClose={() => props.setShowLogin(false)}>
				Create a New Account
			</WMHeader>
			<WMMain className="modal-main">

				<WInput 
					className="modal-input" onBlur={updateInput} name="name" labelAnimation="up" 
					barAnimation="solid" labelText="Name" wType="outlined" inputType="text"
				/>


				<div className="modal-spacer">&nbsp;</div>

				<WInput 
					className="modal-input" onBlur={updateInput} name="email" labelAnimation="up" 
					barAnimation="solid" labelText="Email Address" wType="outlined" inputType="text" 
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
                        <WButton className="modal-button" span hoverAnimation="darken" clickAnimation="ripple-light" color="colored">
                            Create Account
                        </WButton>
                    </WCol>
                    <WCol size="6">
                        <WButton className="modal-button" span hoverAnimation="darken" clickAnimation="ripple-light" color="colored">
                            Cancel
                        </WButton>
                    </WCol>
                </WRow>

			</WMFooter>
			
		</WModal>
	);
}

export default CreateAccount;
