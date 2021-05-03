import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import {WNavbar,WNavItem} 	from 'wt-frontend';
import {WLayout, WLHeader, WLMain} from 'wt-frontend';
import {WButton} from 'wt-frontend';
import Logo from '../navbar/Logo'
import * as mutations from '../../cache/mutations';
import { useMutation, useApolloClient }     from '@apollo/client';
import UpdateAccount from '../modals/UpdateAccount';


const Regionscreen = (props) => {
    const client = useApolloClient();
    const [Logout] = useMutation(mutations.LOGOUT);
    const [loggedOut, toggleLoggedOut] = useState(false);
    const [returnHome, toggleReturnHome] = useState(false);
	
	const [showUpdate, toggleShowUpdate] 	= useState(false);

	const setShowUpdate = () => {
		toggleShowUpdate(!showUpdate);
    };
    
    const setReturnHome = () => {
        toggleReturnHome(true)
    }


    const handleLogout = async (e) => {
		Logout();
		await client.clearStore();
		await props.fetchUser();
		toggleLoggedOut(true)
    };

    if(returnHome == true){
        return <Redirect to={ {pathname: "/mapscreen/" + props.user._id}}/>
    }

    if(loggedOut == true){
        return <Redirect to={ {pathname: "/homescreen"}}/>
    }



    return(
            <WLayout WLayout="header"> 
                <WLHeader color="colored">
                    <WNavbar className="navbar">
                        <ul>
                            <WNavItem>
                                <div onClick={setReturnHome} style={{ cursor: 'pointer'}} className="region-logo">
                                    <Logo/>
                                </div>
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
                            //bad coding here bc routes werent configured properly initially (setShowSelectScreen={setShowUpdate} really means setShowSelectScreen={setShowSelectionScreen}) 
                            showUpdate && (<UpdateAccount setShowSelectScreen={setShowUpdate} user={props.user} fetchUser={props.fetchUser}/>)
                        }

                        

                </WLMain>

                
            </WLayout>
	);

}

export default Regionscreen;

