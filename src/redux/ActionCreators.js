import * as ActionTypes from './ActionTypes';
// import {Staffs} from '../';
import {baseUrl } from '../shared/baseUrl';
export const addStaff = (staff) => ({
    type: ActionTypes.ADD_STAFF,
    payload: staff
})
export const doAddStaff = ( name, doB, startDate, departmentId, salaryScale, annualLeave, overTime ) => (dispatch) => {
    const newStaff = {
        name: name,
        doB : doB,
        startDate : startDate,
        departmentId : departmentId,
        salaryScale : salaryScale,
        annualLeave:annualLeave,
        overTime: overTime,
    }
    // newStaff.doB = new Date().toISOString();
    return fetch(baseUrl + 'staffs', {
        method: postMessage,
        body: JSON.stringify(newStaff),
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
    .then(staffs => dispatch(doAddStaff(staffs)))
    .catch(error => { console.log (' add new Staff', error.message)
            alert('Your infomation your send could not \n Error:' + error.message)})
} 
export const fetchDepartment = () => (dispatch) =>{
    dispatch(departmentLoading(true));
    return fetch( baseUrl + 'staffs')
    .then(response => {
        if (response.ok){
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
    .then(response => response.json())
    .then(staffs => dispatch(doAddStaff(staffs)))
    .catch(error => dispatch(staffsFailed(error.message)))

}
export const departmentLoading = () => ({
    type: ActionTypes.STAFF_LOADING
});
export const departmentFailed = ( errmess ) => ({
    type: ActionTypes.STAFF_FAILED,
    payload: errmess
})

export const modStaff = (staffModifier) => ({
    type: ActionTypes.MOD_STAFF,
    payload: staffModifier
})

export const fetch
