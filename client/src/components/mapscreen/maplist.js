import React from 'react';
import MapEntry from './mapentry'
import {WLSide, WSidebar, WCol, WRow} from 'wt-frontend';

const MapList = (props) => {
        
    return (
        <>
        {
            props.rootRegions && props.rootRegions.map(region => ( 

                    <MapEntry region={region}/>

            ))
        }
        </>
    );
};

export default MapList;