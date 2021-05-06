import React, {useState,useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import * as mutations from '../../cache/mutations';
import * as queries from '../../cache/queries';
import { useMutation, useQuery, useApolloClient } from '@apollo/client';
import RegionSpreadsheetList from './regionspreadsheetlist'
import AddIcon from '@material-ui/icons/Add';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import DeleteSubregionModal from '../modals/DeleteSubregion'
import {AddNewSubregion_Transaction, DeleteSubregion_Transaction, EditSubregion_Transaction} from '../../utils/jsTPS'
const RegionSpreadsheet = (props) => {
    
    const keyCombination = (e, callback) => {
		if(e.key === 'z' && e.ctrlKey) {
			if(props.tps.hasTransactionToUndo()) {
				tpsUndo();
			}
		}
		else if (e.key === 'y' && e.ctrlKey) { 
			if(props.tps.hasTransactionToRedo()) {
				tpsRedo();
			}
		}
	}
	document.onkeydown = keyCombination;

    let subregions = []; 
    let regionID = props.region._id; //regionid

    const [regionToDelete, setRegionToDelete] = useState(null);
    const [canUndo, setCanUndo] = useState(props.tps.hasTransactionToUndo());
	const [canRedo, setCanRedo] = useState(props.tps.hasTransactionToRedo());

    const [AddNewSubregion] = useMutation(mutations.ADD_NEW_SUBREGION);
    const [AddSubregion] = useMutation(mutations.ADD_SUBREGION)
    const [DeleteSubregion] = useMutation(mutations.DELETE_SUBREGION);
    const [EditSubregion] = useMutation(mutations.EDIT_SUBREGION)


    const clickDisabled = () => { };

    const { loading, error, data, refetch} = useQuery(queries.GET_ALL_SUBREGIONS, { variables: {id: regionID} });
	if(loading) {}
	if(error) { console.log(error, 'error'); }
	if(data) { 
        subregions = data.getAllSubregions; 
    }

    const tpsUndo = async () => {
		const ret = await props.tps.undoTransaction();
		if(ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
    }
    

	const tpsRedo = async () => {
		const ret = await props.tps.doTransaction();
		if(ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
	}


    const handleAddChildRegion = async () => {
        let _id = props.region._id;
        let transaction = new AddNewSubregion_Transaction(_id, AddNewSubregion, DeleteSubregion, refetch);
        props.tps.addTransaction(transaction);
        tpsRedo();

    }

    const handleDeleteChildRegion = async (_id) => {
        let transaction = new DeleteSubregion_Transaction(_id, DeleteSubregion, AddSubregion, refetch);
        props.tps.addTransaction(transaction)
        tpsRedo();
    }

    const handleRegionToDelete = (region) => {
        setRegionToDelete(region);
    }

    const editRegionField = (regionID, name, newValue, prevValue) => {
        let transaction = new EditSubregion_Transaction(regionID, name, newValue, prevValue, EditSubregion, refetch);
        props.tps.addTransaction(transaction);
        tpsRedo();
    }

    const undoOptions = {
        className: !canUndo ? ' undo-button-disabled ' : 'undo-button',
        onClick: !canUndo  ? clickDisabled : tpsUndo
    }

    const redoOptions = {
        className: !canRedo ? ' undo-button-disabled ' : 'undo-button',
        onClick: !canRedo  ? clickDisabled : tpsRedo
    }



    return (
        <div className="spreadsheet-container">

                <div className="spreadsheet-info-header">
                    <div className="region-add-icon"><AddIcon onClick={handleAddChildRegion} fontSize="large"/></div>
                    <div className="region-undo-redo-icons"><UndoIcon {...undoOptions} fontSize="large" /> <RedoIcon {...redoOptions} fontSize="large"/></div>
                    <div className="region-name-text">Region Name: </div>
                    <div className="region-name"> {props.region.name} </div>    
                </div>

                <RegionSpreadsheetHeader/> 

                <RegionSpreadsheetList region={props.region} subregions={subregions} handleDeleteChildRegion={handleRegionToDelete} 
                tps={props.tps} editRegionField={editRegionField} images={props.images}/>

                <RegionSpreadsheetEnd/>

                {
                    regionToDelete && <DeleteSubregionModal regionToDelete={regionToDelete} 
                    handleRegionToDelete={handleRegionToDelete} handleDeleteChildRegion={handleDeleteChildRegion}/>
                }
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
            <div className="spreadsheet-table-end-item" style={{ border:0}}>
                .....
            </div>
        </div>



    );
};

export default RegionSpreadsheet;
