import React, {useState} from 'react';
import { Redirect, useParams } from 'react-router-dom';
import {WNavbar,WNavItem} 	from 'wt-frontend';
import {WLayout, WLHeader, WLMain} from 'wt-frontend';
import {WButton} from 'wt-frontend';
import Logo from '../navbar/Logo'
import * as mutations from '../../cache/mutations';
import * as queries from '../../cache/queries';
import { useMutation, useApolloClient, useQuery }     from '@apollo/client';
import UpdateAccount from '../modals/UpdateAccount';
import RegionSpreadsheet from './regionspreadsheet';
import RegionNavigator from './regionnavigator.js';


const Regionscreen = (props) => {
    let _id = useParams();  //regionID
    let region = null; 
    let ancestorRegions = [];

    const client = useApolloClient();
    const [Logout] = useMutation(mutations.LOGOUT);
    const [loggedOut, toggleLoggedOut] = useState(false);
    const [returnHome, toggleReturnHome] = useState(false);
    const [showUpdate, toggleShowUpdate] 	= useState(false);
    const [showMain, toggleShowMain] = useState(true);
    
    const { loading, error, data, refetch } = useQuery(queries.GET_REGION_BY_ID, { variables: _id });
    const { loading:loading1, error:error1, data:data1 } = useQuery(queries.GET_ANCESTOR_REGIONS, { variables: _id });

    if(error) { console.log(error); }
	if(loading) { return <div></div> }
	if(data) { 
            region = data.getRegionById;
    }
    

    if(error1) {console.log(error1)}
    if(loading1) {}
    if(data1){
            ancestorRegions = data1.getAncestorRegions;
    }

	const setShowUpdate = () => {
        toggleShowUpdate(!showUpdate);
        toggleShowMain(!showMain)
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

                        <ul style={{paddingRight:'10%'}}>
                            <RegionNavigator region={region} ancestorRegions={ancestorRegions} /> 
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

                        {
                            showMain && (<RegionSpreadsheet tps={props.transactionStack} user={props.user} region={region}/>)
                        }

                        

                </WLMain>

                
            </WLayout>
	);

}

export default Regionscreen;

