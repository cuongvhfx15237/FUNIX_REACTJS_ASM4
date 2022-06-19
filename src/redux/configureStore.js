import { combineReducers, applyMiddleware, createStore} from 'redux';
import { Staffs } from './Staffs';
import { Departments} from './Departments';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { StaffsSalary } from './staffSalary';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            staffs : Staffs,
            departments : Departments,
            staffsSalary: StaffsSalary
        }),
    applyMiddleware(thunk, logger))
return store;
    }
