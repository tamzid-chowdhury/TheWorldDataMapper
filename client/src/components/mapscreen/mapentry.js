import React, { useState }  from 'react';
import { WButton, WInput, WCol } from 'wt-frontend';

const MapEntry = (props) => {
 
    
    return (
        <WCol size = "12" className="map-entries">
            <WButton className="map-entries-button"  wType="transparent" hoverAnimation="darken" clickAnimation="ripple-dark">
                {props.region.name}
            </WButton>
        </WCol>
        
    );
};

export default MapEntry;