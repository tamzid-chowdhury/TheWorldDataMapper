import React, {useState,useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import * as mutations from '../../cache/mutations';
import * as queries from '../../cache/queries';
import { useMutation, useQuery, useApolloClient } from '@apollo/client';
import RegionSpreadsheetList from './regionspreadsheetlist'
import AddIcon from '@material-ui/icons/Add';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';

const RegionSpreadsheet = (props) => {
    let subregions = []; 
    let regionID = props.region._id; //regionid

    const [AddNewSubregion] = useMutation(mutations.ADD_NEW_SUBREGION);

    const { loading, error, data, refetch} = useQuery(queries.GET_ALL_SUBREGIONS, { variables: {id: regionID} });
	if(loading) { console.log(loading, 'loading'); }
	if(error) { console.log(error, 'error'); }
	if(data) { 
        subregions = data.getAllSubregions; 
        console.log(subregions);
    }

    const handleAddChildRegion = async () => {
        let _id = props.region._id;
        const { loading, error, data } = await AddNewSubregion({ variables: {_id}  });
        if (loading) {};
        if (error) {console.log(error)}
		if (data) {
			refetch();	
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

                <RegionSpreadsheetList region={props.region} subregions={subregions}/>

                <RegionSpreadsheetEnd/>
        </div>



    );
};

const RegionSpreadsheetHeader = (props) => {
    return (
        <div className="spreadsheet-table-header">
            <div className="spreadsheet-table-header-item">
                Name
            </div>
            <div className="spreadsheet-table-header-item">
                Capital
            </div>
            <div className="spreadsheet-table-header-item">
                Leader
            </div>
            <div className="spreadsheet-table-header-item">
                Flag
            </div>
            <div className="spreadsheet-table-header-item">
                Landmarks
            </div>
        </div>



    );
};


const RegionSpreadsheetEnd = (props) => {
    return (
        <div className="spreadsheet-table-end">
            <div className="spreadsheet-table-end-item">
                .....
            </div>
            <div className="spreadsheet-table-end-item">
                .....
            </div>
            <div className="spreadsheet-table-end-item">
                .....
            </div>
            <div className="spreadsheet-table-end-item">
                .....
            </div>
            <div className="spreadsheet-table-entry-landmarks">
                .....
            </div>
        </div>



    );
};

export default RegionSpreadsheet;
