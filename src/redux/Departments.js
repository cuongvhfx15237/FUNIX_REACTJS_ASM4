import * as ActionTypes from "./ActionTypes";

export const Departments = (state = {
   departmentsLoading: true ,
   departments: [],
   isError: null
}, action) =>{
   switch(action.type){
      case ActionTypes.ADD_DEPARTMENT:
         return {...state , departments: action.payload , departmentsLoading: false};
         
      case ActionTypes.DEPARTMENT_LOADING:
         return {...state , departments: [] , departmentsLoading: true};
         
      case ActionTypes.DEPARTMENT_FAIL:
         return {...state , departmentsLoading: false, isError: action.payload};
          
      default:
         return state;
   }
}