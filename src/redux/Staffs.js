import * as ActionTypes from "./ActionTypes";

export const Staffs = (state = {isLoading: true, isError: null ,staffs: []}, action) => {
   switch (action.type) {
      case ActionTypes.FETCH_STAFF_SUCCESS:
         return {...state , isLoading: false ,staffs: action.payload};

      case ActionTypes.STAFFS_LOADING:
         return {...state };

      case ActionTypes.FETCH_STAFF_FAIL:
         return {...state , isLoading: false , isError: action.payload};
      case ActionTypes.UPDATE_STAFF_SUCCESS :
         var staff = action.payload
         return{...state, isLoading: false, staffs: state.staffs.concat(staff)};
      case ActionTypes.DELETE_STAFF_SUCCESS:
         return{...state, isLoading:false, staffs:action.payload}

      default: 
         return state;
   }
};