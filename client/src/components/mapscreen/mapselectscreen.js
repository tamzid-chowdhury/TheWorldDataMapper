import React, {useState} from 'react';
import {WLayout, WLHeader, WLMain, WNavItem, WButton} from 'wt-frontend';
import {WLSide, WSidebar, WCol, WRow} from 'wt-frontend';
import * as mutations from '../../cache/mutations';
import * as queries from '../../cache/queries';
import { useMutation, useApolloClient , useQuery}     from '@apollo/client';
import redGlobe from '../../assets/redglobe.jpg';
import MapList from '../mapscreen/maplist'
import AddMap from '../modals/AddMap'


const MapSelectScreen = (props) => {
    let rootRegions = []

    const [CreateNewMap] = useMutation(mutations.CREATE_NEW_MAP);

    const [showAddModal, toggleShowAddModal] = useState(false);

    const setShowAddModal = () => {
		toggleShowAddModal(!showAddModal);
    };

   
    const { loading, error, data, refetch } = useQuery(queries.GET_USER_MAPS);
    
    if (loading) {return <div></div>};
    if (error) {console.log(error)}
	if (data) {
        rootRegions = data.getRootRegions;	
        console.log(rootRegions)		
    };


    const handleAddRootMap = async (newMap) => {
        let name = newMap;
        const { loading, error, data } = await CreateNewMap({ variables: {name:name}  });
        if (loading) {};
        if (error) {console.log(error)}
		if (data) {
			refetch()		
		};
    }



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
                        <MapList rootRegions={rootRegions}/>
                </WLSide>

                <WLMain className="map-select-main">
                    <WRow>
                        <img src={redGlobe} width="450" height="450"></img>
                    </WRow>
                    <WRow>
                        <WCol size ="12">
                            <WButton wType="default" className="create-map-button" clickAnimation="ripple-dark" onClick={setShowAddModal}> 
                               Create A New Map
                            </WButton>
                        </WCol>
                    </WRow>
                </WLMain>

            </WLayout>

            {	
				showAddModal && (<AddMap setShowAddModal={setShowAddModal} handleAddRootMap={handleAddRootMap}/>)
			}
		</div>
	);
};

export default MapSelectScreen;
