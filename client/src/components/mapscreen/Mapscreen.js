import React, {useState,useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import {WNavbar,WNavItem} 	from 'wt-frontend';
import {WLayout, WLHeader, WLMain} from 'wt-frontend';
import {WButton} from 'wt-frontend';
import Logo from '../navbar/Logo'
import * as mutations from '../../cache/mutations';
import * as queries from '../../cache/queries';
import { useMutation, useApolloClient }     from '@apollo/client';
import UpdateAccount from '../modals/UpdateAccount';
import MapSelectScreen from '../mapscreen/mapselectscreen'


const Mapscreen = (props) => {
    const client = useApolloClient();
	const [Logout] = useMutation(mutations.LOGOUT);

	useEffect(() => {
        props.fetchUser()
    },[props, mutations, queries]);

	const [activeRegionID, setActiveRegion_ID] = useState(null);

	const setActiveRegionID = (_id) => {
		setActiveRegion_ID(_id)
		console.log(_id)
	}
	
	const [showUpdate, toggleShowUpdate] 	= useState(false);
	const [showSelectScreen, toggleShowSelectScreen] 	= useState(true);

	const setShowUpdate = () => {
		toggleShowUpdate(!showUpdate);
		toggleShowSelectScreen(false);
	};

	const setShowSelectScreen = () => {
		toggleShowUpdate(false);
		toggleShowSelectScreen(!showSelectScreen);
	};
    

    const handleLogout = async (e) => {
		Logout();
		await client.clearStore();
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
						showUpdate && (<UpdateAccount setShowSelectScreen={setShowSelectScreen} user={props.user} fetchUser={props.fetchUser}/>)
					}


					{	
						showSelectScreen && (<MapSelectScreen user={props.user} fetchUser={props.fetchUser} setActiveRegionID={setActiveRegionID}/>)
					}


			</WLMain>

			
		</WLayout>
	);

}

export default Mapscreen;

