import React, {useState,useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import * as mutations from '../../cache/mutations';
import * as queries from '../../cache/queries';
import { useMutation, useQuery, useApolloClient } from '@apollo/client';

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
                Landmark
            </div>
        </div>



    );
};

export default RegionSpreadsheetHeader;
