import React, {useState,useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import * as mutations from '../../cache/mutations';
import * as queries from '../../cache/queries';
import { useMutation, useQuery, useApolloClient } from '@apollo/client';

const RegionSpreadsheetList = (props) => {
    return (
        <>
        {
            props.subregions.map(subregion => (
                <RegionSpreadsheetEntry key={subregion._id} subregion={subregion}/> 
            ))
        }
        </>
    );
};

const RegionSpreadsheetEntry = (props) => {
    const [subregionSelected, toggleSubregionSelected] = useState(false);

    const handleNavigateToSubregion = async () => {
        toggleSubregionSelected(true);
        
    }

    if(subregionSelected){
        return <Redirect to={ {pathname: '/regionscreen/' + props.subregion._id}}/>
    }

    return (
        <div className="spreadsheet-table-entry">

            <div className="spreadsheet-table-entry-item">
                <div className ="table-entry-name" onClick={handleNavigateToSubregion}>
                    {props.subregion.name}
                </div>
            </div>

            <div className="spreadsheet-table-entry-item">
                {props.subregion.capital}
            </div>

            <div className="spreadsheet-table-entry-item">
                {props.subregion.leader}
            </div>

            <div className="spreadsheet-table-entry-item">
                {props.subregion.flag}
            </div>

            <div className="spreadsheet-table-entry-landmarks">
                {props.subregion.landmarks[0] ? props.subregion.landmarks[0] + ", ..." : "No Landmarks"}
            </div>

        </div>
    )
}

export default RegionSpreadsheetList;
