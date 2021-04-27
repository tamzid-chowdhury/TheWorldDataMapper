import React, {useState} from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
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
		<WLayout WLayout="header"> 
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
				<div className="homescreenMain">

					{
						showHomescreenLogo && (<HomescreenLogo/>)
					}

					{
						showCreate && (<CreateAccount  setShowHomescreenLogo={setShowHomescreenLogo} />)
					}

					{
						showLogin && (<Login setShowHomescreenLogo={setShowHomescreenLogo} />)
					}

				</div>
			</WLMain>

			
		</WLayout>
	);

}

export default Homescreen;

