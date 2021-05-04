import React, {useState} from 'react';
import { Redirect, useParams } from 'react-router-dom';
import {WNavbar,WNavItem} 	from 'wt-frontend';
import {WLayout, WLHeader, WLMain} from 'wt-frontend';
import {WButton} from 'wt-frontend';
import Logo from '../navbar/Logo'
import * as mutations from '../../cache/mutations';
import * as queries from '../../cache/queries';
import { useMutation, useApolloClient, useQuery }     from '@apollo/client';

const RegionNavigator = (props) => {

    return (
        <>
            {
                props.ancestorRegions.map(region => (
                    <RegionNavigationEntry region={region}/>
                ))
            }
        </>
    );
}

const RegionNavigationEntry = (props) => { 
    const [ancestorSelected, toggleAncestorSelected] = useState(false);

    const handleNavigateToAncestor = () => { 
        toggleAncestorSelected(true);
    }


    if (ancestorSelected){
        return <Redirect to={ {pathname: '/regionscreen/' + props.region._id}}/>
    }

 
    return (
        <>
            <div className="region-navigator" onClick={handleNavigateToAncestor}>{props.region.name} </div>
            <div> &nbsp; &gt; &nbsp;  </div>
        </>
    )
}

export default RegionNavigator; 