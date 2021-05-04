import React, {useState,useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import * as mutations from '../../cache/mutations';
import * as queries from '../../cache/queries';
import { useMutation, useQuery, useApolloClient } from '@apollo/client';
import RegionSpreadsheetHeader from './regionspreadsheetheader'
import RegionSpreadsheetList from './regionspreadsheetlist'
import RegionSpreadsheetEnd from './regionspreadsheetend'
import AddIcon from '@material-ui/icons/Add';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';

const RegionSpreadsheet = (props) => {
    const [AddNewSubregion] = useMutation(mutations.ADD_NEW_SUBREGION);

    const handleAddChildRegion = async () => {
        let _id = props.region._id;
        console.log(_id)
        const { loading, error, data } = await AddNewSubregion({ variables: {_id}  });
        if (loading) {};
        if (error) {console.log(error)}
		if (data) {
			console.log(data);	
		};

    }


    return (
        <div className="spreadsheet-container">

                <div className="spreadsheet-info-header">
                    <div className="region-add-icon"><AddIcon onClick={handleAddChildRegion} fontSize="large"/></div>
                    <div className="region-undo-redo-icons"><UndoIcon fontSize="large" /> <RedoIcon fontSize="large"/></div>
                    <div className="region-name-text">Region Name: </div>
                    <div className="region-name"> {props.region.name} </div>    
                </div>

                <RegionSpreadsheetHeader/> 

                <RegionSpreadsheetList region={props.region}/>

                <RegionSpreadsheetEnd/>
        </div>



    );
};

export default RegionSpreadsheet;
