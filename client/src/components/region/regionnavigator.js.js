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
        <div className="region-navigator"> United States -- New York </div>
    );
}

export default RegionNavigator; 