import { combineReducers, applyMiddleware, createStore} from 'redux';
import { Staffs } from './Staffs';
import { Departments} from './Departments';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { StaffSalary } from './staffSalary';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            staffs : Staffs,
            department : Departments,
            staffSalary: StaffSalary
        }),
    applyMiddleware(thunk, logger))
return store;
    }
