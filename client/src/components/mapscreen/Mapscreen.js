import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import {WNavbar,WNavItem} 	from 'wt-frontend';
import {WLayout, WLHeader, WLMain} from 'wt-frontend';
import {WButton} from 'wt-frontend';
import Logo from '../navbar/Logo'
import * as mutations from '../../cache/mutations';
import { useMutation, useApolloClient }     from '@apollo/client';
import UpdateAccount from '../modals/UpdateAccount';

const Mapscreen = (props) => {
    const client = useApolloClient();
	const [Logout] = useMutation(mutations.LOGOUT);

	const [showUpdate, toggleShowUpdate] 	= useState(false);

	const setShowUpdate = () => {
		toggleShowUpdate(!showUpdate);
	};
    

    const handleLogout = async (e) => {
		Logout();
		await client.resetStore();
        await props.fetchUser();
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

							<WButton className="create-account-button" wType="texted" onClick={setShowUpdate}>
                    		    {props.username}
                			</WButton>

						</WNavItem>

						<WNavItem hoverAnimation="lighten">

							<WButton className="login-button" wType="texted" onClick={handleLogout}>
                                Logout
                			</WButton>

						</WNavItem>
						
					</ul>

				</WNavbar>

			</WLHeader>

			<WLMain>

					{
						showUpdate && (<UpdateAccount setShowUpdate={setShowUpdate} user={props.user} fetchUser={props.fetchUser}/>)
					}

			</WLMain>

			
		</WLayout>
	);

}

export default Mapscreen;

