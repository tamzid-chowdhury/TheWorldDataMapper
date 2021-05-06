import React, {useState,useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import * as mutations from '../../cache/mutations';
import * as queries from '../../cache/queries';
import { useMutation, useQuery, useApolloClient } from '@apollo/client';
import DeleteIcon from '@material-ui/icons/Delete';
import {WInput} 	from 'wt-frontend';
import earth from '../../assets/earth.jpg';

const RegionSpreadsheetList = (props) => {

    const handleSubregionDeletion = (subregion) => {
        props.handleDeleteChildRegion(subregion);
    }


    return (
        <>
        {
            props.subregions.map(subregion => (
                <RegionSpreadsheetEntry key={subregion._id} subregion={subregion} handleSubregionDeletion={handleSubregionDeletion} 
                tps={props.tps} editRegionField={props.editRegionField} images={props.images}/> 
            ))
        }
        </>
    );
};

const RegionSpreadsheetEntry = (props) => {

    let flagName = props.subregion.name + " Flag.png"
    let flagSource = props.images[flagName]

    const [subregionSelected, toggleSubregionSelected] = useState(false);
    const [landmarkSelected, toggleLandmarkSelected] = useState(false);

    const [editingName, toggleNameEdit] = useState(false);
    const [editingCapital, toggleCapitalEdit] = useState(false);
    const [editingLeader, toggleLeaderEdit] = useState(false);

    const setNameEdit = () => {
        toggleNameEdit(!editingName)
        toggleCapitalEdit(false);
        toggleLeaderEdit(false);
    }

    const setCapitalEdit = () => {
        toggleCapitalEdit(!editingCapital)
        toggleNameEdit(false);
        toggleLeaderEdit(false);
    }

    const setLeaderEdit = () => {
        toggleLeaderEdit(!editingLeader)
        toggleCapitalEdit(false);
        toggleNameEdit(false);
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
                autoFocus={true} defaultValue={props.subregion.name} type='text' onKeyDown={(e) => {if(e.keyCode === 39) setCapitalEdit()}}
                />
                : 
                <div className="spreadsheet-table-entry-item" onClick={setNameEdit}>
                    <div className ="table-entry-name" onClick={handleNavigateToSubregion} >
                            {props.subregion.name}
                    </div>
                </div>

            }     

            {
                editingCapital ? 
                <input
                className='spreadsheet-table-entry-item-input' onBlur={handleCapitalEdit} 
                onKeyDown={(e) => {if(e.keyCode === 39) setLeaderEdit(); if(e.keyCode === 37) setNameEdit()}}
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
                onKeyDown={(e) => {if(e.keyCode === 37) setCapitalEdit()}}
                />
                : 
                <div className="spreadsheet-table-entry-item" onClick={setLeaderEdit}>
                            {props.subregion.leader}
                </div>

            }  
        

            <div className="spreadsheet-table-entry-item-flag">
                {
                    flagSource === undefined ? <img src={earth} height="25px" width="50px"/> : <img src={flagSource} height="25px" width="50px"/> 
                }
            </div>

            <div className="spreadsheet-table-entry-landmarks" onClick={handleNavigateToLandmarkscreen}>
                {props.subregion.landmarks[0] ? props.subregion.landmarks[0] + ", ..." : "No Landmarks"}
            </div>

        </div>
    )
}

export default RegionSpreadsheetList;
