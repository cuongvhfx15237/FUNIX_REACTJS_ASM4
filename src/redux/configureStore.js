import { createStore, combineReducers, applyMiddleware} from 'redux';
import { Staffs } from './Staffs';
import { Departments} from './Departments';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {createForms} from 'react-redux-form';
import {InitialInfo} from './forms';

export const ConfigureStore = () => {
    const store = (
        combineReducers({
            staffs : Staffs,
            department : Departments,
            ...createForms({
                info: InitialInfo
            })
        }),
    applyMiddleware(thunk, logger))
return store;
    }
