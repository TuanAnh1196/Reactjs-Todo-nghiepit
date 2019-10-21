import {combineReducers} from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import itemEditting from './itemEditting';
import filterTable from './filterTable';

const  myReducer = combineReducers({
    tasks: tasks,
    isDisplayForm: isDisplayForm,
    itemEditting: itemEditting,
    filterTable: filterTable
});
export default myReducer;