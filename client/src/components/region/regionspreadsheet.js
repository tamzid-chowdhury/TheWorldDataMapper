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
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import {AddNewSubregion_Transaction, DeleteSubregion_Transaction, EditSubregion_Transaction, Sort_Transaction} from '../../utils/jsTPS'
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
    const [SortSubregion] = useMutation(mutations.SORT_SUBREGION)
    const [UndoSortSubregion] = useMutation(mutations.UNDO_SORT_SUBREGION)


    const clickDisabled = () => { };

    const { loading, error, data, refetch} = useQuery(queries.GET_ALL_SUBREGIONS, { variables: {id: regionID, sortRule:props.region.sortRule, sortDirection:props.region.sortDirection} });
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

    const sort = (newName) => {
        let regionID = props.region._id;
        let prevName = props.region.sortRule; 
        let prevDirection = props.region.sortDirection; 
        let transaction = new Sort_Transaction(regionID, newName, prevName, prevDirection, SortSubregion, UndoSortSubregion)
        props.tps.addTransaction(transaction);
        tpsRedo()
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

                <RegionSpreadsheetHeader subregions={subregions} sort={sort} region={props.region}/> 

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

    const clickDisabled = () => { };
    let disabled = props.subregions.length == 0 ? true : false; 

    const handleSort = (e) => {
        let newName = e.target.textContent
        newName = newName.toLowerCase()
        props.sort(newName);
    }

    const nameSort = props.region.sortRule == 'name' ? 'currently-sorting':''
    const capitalSort = props.region.sortRule == 'capital' ? 'currently-sorting':''
    const leaderSort = props.region.sortRule == 'leader' ? 'currently-sorting':''

    const sortDirection = props.region.sortDirection;
 

    const nameOptions = {
        className: disabled ? 'spreadsheet-table-header-item' : 'spreadsheet-table-header-item sort ' + nameSort,
        onClick: disabled  ? clickDisabled : handleSort
    }
    
    const capitalOptions = {
        className: disabled ? 'spreadsheet-table-header-item' : 'spreadsheet-table-header-item sort ' + capitalSort,
        onClick: disabled  ? clickDisabled : handleSort
    }

    const leaderOptions = {
        className: disabled ? 'spreadsheet-table-header-item' : 'spreadsheet-table-header-item sort ' + leaderSort,
        onClick: disabled  ? clickDisabled : handleSort
    }

    return (
        <div className="spreadsheet-table-header">
            <div {...nameOptions} style={{paddingLeft:"30px"}}>
                Name

                {
                    nameSort == "currently-sorting" && (sortDirection == 1 ? <KeyboardArrowUpIcon style={{ paddingTop: '10px'}}/>:<KeyboardArrowDownIcon style={{ paddingTop: '10px'}}/>)
                }
            </div>
            <div {...capitalOptions} >
                Capital
                {
                    capitalSort == "currently-sorting" && (sortDirection == 1 ? <KeyboardArrowUpIcon style={{ paddingTop: '10px'}}/>:<KeyboardArrowDownIcon style={{ paddingTop: '10px'}}/>)
                }
            </div>
            <div {...leaderOptions} >
                Leader
                {
                    leaderSort == "currently-sorting" && (sortDirection == 1 ? <KeyboardArrowUpIcon style={{ paddingTop: '10px'}}/>:<KeyboardArrowDownIcon style={{ paddingTop: '10px'}}/>)
                }
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
