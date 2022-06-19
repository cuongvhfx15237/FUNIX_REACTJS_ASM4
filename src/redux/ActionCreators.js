import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';

// Action dispatch staffs

export const fetchStaffs = () => (dispatch) => {
   dispatch(staffsLoading(true))
   return fetch(baseUrl +'staffs')
   .then(
      (response) => {
         if (response.ok) {
            return response;
         } 
         else {
            var error = new Error(
               "Error" + response.status + response.statusText
            );
            error.response = response;
            throw error;
         }
      },
      (error) => {
        var errmess = new Error(error.message);
        console.log(errmess);
        throw errmess;
      }
   )
   .then(response => response.json())
   .then(staffs => {
      dispatch(addStaffs(staffs));
   })
   .catch(err => dispatch(fetchStaffsFailed(err.message)));
};

export const addStaffs = (staffs) => ({
   type: ActionTypes.FETCH_STAFF_SUCCESS,
   payload: staffs 
});

export const staffsLoading = () => ({
   type: ActionTypes.STAFFS_LOADING,
});

export const fetchStaffsFailed =(error) => ({
   type: ActionTypes.FETCH_STAFF_FAIL,
   payload: error
});

// Action dispatch departments 

export const fetchDepartments = () => (dispatch) => {
   dispatch(departmentsLoading(true));

   return fetch(baseUrl + 'departments')
   .then(
      (response) => {
         if(response.ok){
            return response;
         }
         else {
            var error = new Error(
               "Error" + response.status + response.statusText
            );
            error.response = response;
            throw error;
         }
      },
      (error) => {
         var errmess = new Error(error.message);
         console.log(errmess);
         throw errmess;
      }
   )
   .then(response => response.json())
   .then(departments =>{
      dispatch(addDepartments(departments))}
   )
   .catch(err => dispatch(departmentsFaild(err.message)))
};

export const addDepartments = (departments) =>({
   type: ActionTypes.ADD_DEPARTMENT,
   payload: departments
});

export const departmentsLoading = (error) =>({
   type: ActionTypes.DEPARTMENT_LOADING,
});

export const departmentsFaild = (error) =>({
   type: ActionTypes.DEPARTMENT_FAIL,
   payload: error
})

//---------- Action dispatch Salary Staffs ---------------

export const fetchSalarys = () => (dispatch) => {
   dispatch(salaryLoading(true));
   return fetch(baseUrl + 'StaffsSalary')
   .then(
      (response) => {
         if(response.ok){
            return response;
         }
      }
   )
   .then(response => response.json())
   .then(StaffsSalary => {
      dispatch(addSalarysStaffs(StaffsSalary));
   })
};

export const addSalarysStaffs = (salaryStaffs) =>({
   type: ActionTypes.STAFFSALARY_SUCCESS,
   payload: salaryStaffs,
});

export const salaryLoading = () => ({
   type: ActionTypes.STAFFSALARY_LOADING,
});