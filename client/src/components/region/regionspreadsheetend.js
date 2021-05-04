import React, {useState,useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import * as mutations from '../../cache/mutations';
import * as queries from '../../cache/queries';
import { useMutation, useQuery, useApolloClient } from '@apollo/client';

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
            <div className="spreadsheet-table-end-item">
                .....
            </div>
        </div>



    );
};

export default RegionSpreadsheetEnd;
