import React, {useState,useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import * as mutations from '../../cache/mutations';
import * as queries from '../../cache/queries';
import { useMutation, useQuery, useApolloClient } from '@apollo/client';
import RegionSpreadsheetHeader from './regionspreadsheetheader'
import AddIcon from '@material-ui/icons/Add';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';

const RegionSpreadsheet = (props) => {
    return (
        <div className="spreadsheet-container">

                <div className="spreadsheet-info-header">
                    <div className="region-add-icon"><AddIcon fontSize="large"/></div>
                    <div className="region-undo-redo-icons"><UndoIcon fontSize="large" /> <RedoIcon fontSize="large"/></div>
                    <div className="region-name">Add</div>
                </div>

                <RegionSpreadsheetHeader/> 
        </div>



    );
};

export default RegionSpreadsheet;
