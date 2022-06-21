import React from "react";
import {Button} from 'reactstrap';
import { Link } from "react-router-dom";

export const delButton = () => {
    return(
        <Button color='danger' style={{display: 'inline-flex', width:"50%"}} onClick={deleteStaff}>Delete</Button>
    )
}
export const updateButton  = (props) =>{
    return(
        <Link to={`${props.Staff.id}`} style={{display: 'inline-flex', width:"50%"}}>
        <Button color='primary' style={{margin:'0px', width: "100%"}} onClick={updateStaff}>Update</Button>
        </Link>
    )
}
function deleteStaff(){
console.log('Delete')
}
function updateStaff(){
    console.log('update')
}