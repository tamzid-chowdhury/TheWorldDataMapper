import React, {useState} from 'react';
import {WLayout, WLHeader, WLMain, WNavItem, WButton} from 'wt-frontend';
import {WLSide, WSidebar, WCol, WRow} from 'wt-frontend';
import * as mutations from '../../cache/mutations';
import { useMutation, useApolloClient }     from '@apollo/client';
import redGlobe from '../../assets/redglobe.jpg';

const MapSelectScreen = (props) => {
	return(
		<div className = "map-select-container">
			<WLayout wLayout="header-lside-footer">
                <WLHeader className="map-select-header">
                    <WRow className="map-select-red-top">
                        &nbsp;
                    </WRow>
                    Your Maps
                </WLHeader>

                <WLSide className="map-select-side">

                </WLSide>

                <WLMain className="map-select-main">
                    <WRow>
                        <img src={redGlobe} width="450" height="450"></img>
                    </WRow>
                    <WRow>
                        <WCol size ="12">
                            <WButton wType="default" className="create-map-button" clickAnimation="ripple-dark"> 
                               Create A New Map
                            </WButton>
                        </WCol>
                    </WRow>
                </WLMain>

            </WLayout>
		</div>
	);
};

export default MapSelectScreen;
