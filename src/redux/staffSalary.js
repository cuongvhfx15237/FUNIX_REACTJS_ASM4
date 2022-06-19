import * as ActionTypes from "./ActionTypes";

export const StaffsSalary = (state= {salaryLoading: true , staffsSalary: []}, action) => {
   switch(action.type){
      case ActionTypes.STAFFSALARY_LOADING:
         return {...state , salaryLoading: true, staffsSalary: []};
      
      case ActionTypes.STAFFSALARY_SUCCESS:
         return {...state , salaryLoading: false , staffsSalary: action.payload};
      
      default: 
         return state;
   }
}; 