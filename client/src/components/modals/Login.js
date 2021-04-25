import React, { useState } 	from 'react';
import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput } from 'wt-frontend';

const Login = (props) => {
	const [input, setInput] = useState({ email: '', password: '' });
	const errorMsg = "Email/Password not found.";

	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	}

	return (
		<WModal className="login-modal" cover="true">
			<WMHeader  className="modal-header">
				Login
			</WMHeader >
                <WMMain className="main-login-modal">

						<WInput className="modal-input" onBlur={updateInput} name='email' labelAnimation="up" barAnimation="solid" labelText="Email Address" wType="outlined" inputType='text' />
						<div className="modal-spacer">&nbsp;</div>
						<WInput className="modal-input" onBlur={updateInput} name='password' labelAnimation="up" barAnimation="solid" labelText="Password" wType="outlined" inputType='password' />

				</WMMain >
			
			<WMFooter>
				<WButton className="modal-button" span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded">
					Login
				</WButton>
			</WMFooter>
		</WModal >
	);
}

export default Login;