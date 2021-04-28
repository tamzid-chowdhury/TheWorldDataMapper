import React, { useState } 	from 'react';
import { useMutation }    	from '@apollo/client';
import { LOGIN }			from '../../cache/mutations';
import { Redirect } from 'react-router-dom';
import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const Login = (props) => {
	const [input, setInput] = useState({ email: '', password: '' });
	const [showErr, displayErrorMsg] = useState(false);

	const [loggedIn, toggleLoggedIn] = useState(false);

	const errorMsg = "Email/Password not found";
	const [Login] = useMutation(LOGIN);

	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	}

	const handleLogin = async (e) => {
	
		const { loading, error, data } = await Login({ variables: { ...input } });
		if (loading) {};
		if (data.login._id === null) {
			displayErrorMsg(true);
			return;
		}
		if (data) {
			await props.fetchUser();
			displayErrorMsg(false);
			toggleLoggedIn(true);
			// return <Redirect exact from="/mapscreen" to={ {pathname: "/homescreen"} } /> 
			
		};
	};

	return (
		loggedIn === false ? 
		<WModal className="login-modal"  cover="true" visible="true" animation="fade-in">
			<WMHeader  className="modal-header" onClose={() => props.setShowHomescreenLogo()}>
				Login to Your Account
			</WMHeader>
			<WMMain className="modal-main">


				<WInput 
					className="modal-input" onBlur={updateInput} name="email" labelAnimation="up" 
					barAnimation="solid" labelText="Email Address" wType="outlined" inputType="text" 
					onKeyDown={(e)=> updateInput} 
				/>
							
                <div className="modal-spacer">&nbsp;</div>

				<WInput 
					className="modal-input" onBlur={updateInput} name="password" labelAnimation="up" 
					barAnimation="solid" labelText="Password" wType="outlined" inputType="password"
					onKeyDown={(e)=> e.keyCode == 13 ? handleLogin() : ""} onKeyDown={(e)=> updateInput} 
				/>

				{
					showErr ?
						 <div className='modal-error'>
							{errorMsg}
						</div>

						: <div className='modal-error'>&nbsp;</div>
				}	

			</WMMain>
            
			
			<WMFooter className='modal-footer'>
                <WRow className='modal-col-gap'>
                    <WCol size="6">
						<WButton wType="ghost" className="modal-button" span hoverAnimation="fill" clickAnimation="ripple-dark" 
						color="colored" raised="true" onClick={handleLogin}>
                            Login
                        </WButton>
                    </WCol>
                    <WCol size="6">
                        <WButton wType ="ghost" className="modal-button" span hoverAnimation="fill" 
                        clickAnimation="ripple-dark" color="colored" raised="true" onClick={() => props.setShowHomescreenLogo()}>
                            Cancel
                        </WButton>
                    </WCol>
                </WRow>

			</WMFooter>
			
		</WModal> : <Redirect exact from="/homescreen" to={ {pathname: "/mapscreen"} } /> 
	);
}

export default Login;
