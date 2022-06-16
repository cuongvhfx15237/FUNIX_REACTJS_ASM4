import * as ActionTypes from './ActionTypes';
import {baseUrl } from '../shared/baseUrl';


//addStaff
export const addStaff = (staff) => ({
    type: ActionTypes.ADD_STAFF_SUCCESS,
    payload: staff
})
export const doAddStaff = ( staff ) => (dispatch) => {
    return fetch(baseUrl + 'staffs', {
        method: "POST",
        body: JSON.stringify(staff),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then( response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error' + response.status + ':' + response.statusText)
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    }
    )
    .then (response => response.json())
    .then(response => dispatch(addStaff(response)))
    .catch(error => { console.log (' add new Staff', error.message)
            alert('Your infomation your send could not \n Error:' + error.message)})
} 
//fetch Staff
export const fetchStaffs = () => (dispatch) =>{
    dispatch(staffsLoading(true));
    return fetch( baseUrl + 'staffs')
  
    .then(response => response.json())
    .then(staffs => dispatch(doAddStaff(staffs)))
    .catch(error => dispatch(fetchStaffsFail(error.message)))

}
export const fetchStaffsFail = () => (errmess) =>({
   type: ActionTypes.FETCH_STAFFS_FAIL,
   payload: errmess
})

export const fetchStaffsSuccess = () => (staffs) =>({
    type: ActionTypes.FETCH_STAFFS_SUCCESS,
    payload: staffs
 })
 export const staffsLoading = () => ({
    type: ActionTypes.STAFFS_LOADING,
 })

 //DELETE
export const deleteStaffSuccess = () => (id) => ({
    type: ActionTypes.DELETE_STAFF_SUCCESS,
    payload: id
});
export const deleteStaffLoading = ( ) => ({
    type: ActionTypes.DELETE_STAFF_LOADING,
})

export const deleteStaff = (id) => (dispatch) =>{
    if (window.confirm(" Are you sure to delete this staffs")){
        return fetch(baseUrl + 'staffs/{id}', {
            method: 'DELETE'
        })
        .then(()=> dispatch(deleteStaffSuccess(id)));
    } else return;
}
//StaffSalary
export const staffSalarySuccess = () => (id) => ({
    type: ActionTypes.STAFFSALARY_SUCCESS,
    payload:id
})
export const staffSalaryLoading = () =>({
    type: ActionTypes.STAFFSALARY_LOADING,
})
export const staffSalaryFail =() => (errmess) => ({
    type: ActionTypes.STAFFSALARY_FAIL,
    payload:errmess
})
export const staffSalary = () => (dispatch) => {
    dispatch(staffsLoading(true));
    return fetch ( baseUrl + 'staffs')
    .then (response => response.json())
    .then(staffs => dispatch (doAddStaff(staffs))) //focus in here? why use doAddStaff
    .catch(error => dispatch(staffSalaryFail(error.message)))
}

//updateStaff
export const updateStaffSucces = () => (id) =>({
    type: ActionTypes.UPDATE_STAFF_SUCCESS,
    payload:id
})
export const updateStaffFail = () => (errmess) => ({
    type: ActionTypes.UPDATE_STAFF_FAIL,
    payload: errmess
})
export const updateStaff = (id) => (dispatch) => {
    return fetch(baseUrl + 'staffs', {
        method:'PATCH',
        body: JSON.stringify(id),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then( response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error' + response.status + ':' + response.statusText)
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    }
    )
    .then (response => response.json())
    .then(response => dispatch(updateStaff(response)))
    .catch(error => { console.log (' update Staff', error.message)
            alert('Your infomation your send could not \n Error:' + error.message)})
}