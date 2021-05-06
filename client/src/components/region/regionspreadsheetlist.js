import React, {useState,useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import * as mutations from '../../cache/mutations';
import * as queries from '../../cache/queries';
import { useMutation, useQuery, useApolloClient } from '@apollo/client';
import DeleteIcon from '@material-ui/icons/Delete';
import {WInput} 	from 'wt-frontend';

const RegionSpreadsheetList = (props) => {

    const handleSubregionDeletion = (subregion) => {
        props.handleDeleteChildRegion(subregion);
    }


    return (
        <>
        {
            props.subregions.map(subregion => (
                <RegionSpreadsheetEntry key={subregion._id} subregion={subregion} handleSubregionDeletion={handleSubregionDeletion} 
                tps={props.tps} editRegionField={props.editRegionField}/> 
            ))
        }
        </>
    );
};

const RegionSpreadsheetEntry = (props) => {
    const [subregionSelected, toggleSubregionSelected] = useState(false);
    const [landmarkSelected, toggleLandmarkSelected] = useState(false);

    const [editingName, toggleNameEdit] = useState(false);
    const [editingCapital, toggleCapitalEdit] = useState(false);
    const [editingLeader, toggleLeaderEdit] = useState(false);

    const setNameEdit = () => {
        toggleNameEdit(!editingName)
    }

    const setCapitalEdit = () => {
        toggleCapitalEdit(!editingCapital)
    }

    const setLeaderEdit = () => {
        toggleLeaderEdit(!editingLeader)
    }

    const handleNavigateToSubregion = async () => {
        toggleSubregionSelected(true);
        
    }

    const handleNavigateToLandmarkscreen = async () => {
        toggleLandmarkSelected(true);
    }

    const handleSubregionDeletion = async () => {
        props.handleSubregionDeletion(props.subregion)
    }

    const handleNameEdit = async (e) => {
        setNameEdit();
        const newName = e.target.value ? e.target.value : 'Untitled';
        const prevName = props.subregion.name;
        if(newName !== prevName){
            props.editRegionField(props.subregion._id, 'name', newName, prevName);
        }
    }

    const handleCapitalEdit = async (e) => {
        setCapitalEdit();
        const newCapital = e.target.value ? e.target.value : 'None';
        const prevCapital = props.subregion.capital;
        if(newCapital !== prevCapital){
            props.editRegionField(props.subregion._id, 'capital', newCapital, prevCapital);
        }
    }

    const handleLeaderEdit = async (e) => {
        setLeaderEdit();
        const newLeader = e.target.value ? e.target.value : 'None';
        const prevLeader = props.subregion.leader;
        if(newLeader !== prevLeader){
            props.editRegionField(props.subregion._id, 'leader', newLeader, prevLeader);
        }
    }

    // const newDate = e.target.value ? e.target.value : 'No Date';
    // const prevDate = due_date;
    // if(newDate !== prevDate) {
    //     props.editItem(data._id, 'due_date', newDate, prevDate);

    if(subregionSelected){
        props.tps.clearAllTransactions();
        return <Redirect to={ {pathname: '/regionscreen/' + props.subregion._id}}/>
    }

    if(landmarkSelected){
        props.tps.clearAllTransactions();
        return <Redirect to={ {pathname: '/landmarkscreen/' + props.subregion._id}}/>
    }

    return (
        <div className="spreadsheet-table-entry">

            <div className="spreadsheet-table-delete">
             <DeleteIcon onClick={handleSubregionDeletion}/>
            </div>

            {
                editingName ? 
                <input
                className='spreadsheet-table-entry-item-input' onBlur={handleNameEdit}
                autoFocus={true} defaultValue={props.subregion.name} type='text'
                />
                : 
                <div className="spreadsheet-table-entry-item" onClick={setNameEdit}>
                    <div className ="table-entry-name" onClick={handleNavigateToSubregion}>
                            {props.subregion.name}
                    </div>
                </div>

            }     

            {
                editingCapital ? 
                <input
                className='spreadsheet-table-entry-item-input' onBlur={handleCapitalEdit}
                autoFocus={true} defaultValue={props.subregion.capital} type='text'
                />
                : 
                <div className="spreadsheet-table-entry-item" onClick={setCapitalEdit}>
                            {props.subregion.capital}
                </div>

            }      

            {
                editingLeader ? 
                <input
                className='spreadsheet-table-entry-item-input' onBlur={handleLeaderEdit}
                autoFocus={true} defaultValue={props.subregion.leader} type='text'
                />
                : 
                <div className="spreadsheet-table-entry-item" onClick={setLeaderEdit}>
                            {props.subregion.leader}
                </div>

            }  
        

            <div className="spreadsheet-table-entry-item-flag">
                {props.subregion.flag}
            </div>

            <div className="spreadsheet-table-entry-landmarks" onClick={handleNavigateToLandmarkscreen}>
                {props.subregion.landmarks[0] ? props.subregion.landmarks[0] + ", ..." : "No Landmarks"}
            </div>

        </div>
    )
}

export default RegionSpreadsheetList;
