import React, {useState} from 'react';
import {WNavbar,WNavItem} 	from 'wt-frontend';
import {WLayout, WLHeader, WLMain} from 'wt-frontend';
import {WButton} from 'wt-frontend';
import Logo from '../navbar/Logo'
import HomescreenLogo from "../homescreen/HomescreenLogo"
import CreateAccount from '../modals/CreateAccount';
import Login from '../modals/Login';

const Homescreen = (props) => {
	const [showCreate, toggleShowCreate] 	= useState(false);
	const [showLogin, toggleShowLogin] 		= useState(false);
	const [showHomescreenLogo, toggleShowHomescreenLogo] 	= useState(true);

	const setShowLogin = () => {
		toggleShowHomescreenLogo(false);
		toggleShowCreate(false);
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {
		toggleShowHomescreenLogo(false);
		toggleShowLogin(false);
		toggleShowCreate(!showCreate);
	};

	const setShowHomescreenLogo = () => {
		toggleShowCreate(false);
		toggleShowLogin(false);
		toggleShowHomescreenLogo(!showHomescreenLogo)
	};

    return(
		<WLayout wlayout="header"> 
			<WLHeader color="colored">

				<WNavbar className="navbar">

					<ul>
						<WNavItem>
							<Logo />
						</WNavItem>
					</ul>

					<ul>
						<WNavItem hoverAnimation="lighten">

							<WButton className="create-account-button" wType="texted" onClick={setShowCreate}>
                    			Create Account
                			</WButton>

						</WNavItem>

						<WNavItem hoverAnimation="lighten">

							<WButton className="login-button" wType="texted" onClick={setShowLogin}>
                    			Login
                			</WButton>

						</WNavItem>
						
					</ul>

				</WNavbar>

			</WLHeader>

			<WLMain>

					{
						showHomescreenLogo && ( <div className="homescreenMain"> <HomescreenLogo/> 	</div>)
					}

					{
						showCreate && (<CreateAccount  setShowHomescreenLogo={setShowHomescreenLogo} />)
					}

					{
						showLogin && (<Login setShowHomescreenLogo={setShowHomescreenLogo} fetchUser={props.fetchUser} user={props.user}/>)
					}


			</WLMain>

			
		</WLayout>
	);

}

export default Homescreen;

