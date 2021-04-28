import React from 'react';
import MapEntry from './mapentry'
import {WLSide, WSidebar, WCol, WRow} from 'wt-frontend';

const MapList = (props) => {
    
    return (
        <>
        {
            props.rootRegions && props.rootRegions.map(region => ( 

                    <MapEntry key={region._id} _id={region._id} region={region} 
                    refetchUserMaps={props.refetchUserMaps}/>

            ))
        }
        </>
    );
};

export default MapList;