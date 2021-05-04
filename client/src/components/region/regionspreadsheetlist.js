import React, {useState,useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import * as mutations from '../../cache/mutations';
import * as queries from '../../cache/queries';
import { useMutation, useQuery, useApolloClient } from '@apollo/client';

const RegionSpreadsheetList = (props) => {
    return (
        <div className="spreadsheet-table-list">

        </div>



    );

    // return (
    //     <>
    //     {
    //         props.rootRegions && props.rootRegions.map(region => ( 

    //                 <MapEntry key={region._id} _id={region._id} region={region} 
    //                 refetchUserMaps={props.refetchUserMaps}/>

    //         ))
    //     }
    //     </>
    // );
};

export default RegionSpreadsheetList;
