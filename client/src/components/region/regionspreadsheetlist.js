import React, {useState,useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import * as mutations from '../../cache/mutations';
import * as queries from '../../cache/queries';
import { useMutation, useQuery, useApolloClient } from '@apollo/client';

const RegionSpreadsheetList = (props) => {
    console.log(props.subregion)
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
    return (
        <div className="spreadsheet-table-entry">

            <div className="spreadsheet-table-entry-name">
                {props.subregion.name}
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
                {props.subregion.landmarks}
            </div>

        </div>
    )
}

export default RegionSpreadsheetList;
