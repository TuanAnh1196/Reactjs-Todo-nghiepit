import {combineReducers} from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import itemEditting from './itemEditting';
import filterTable from './filterTable';
import search from './search';
import sort from './sort';

const  myReducer = combineReducers({
    tasks: tasks,
    isDisplayForm: isDisplayForm,
    itemEditting: itemEditting,
    filterTable: filterTable,
    search: search,
    sort: sort
});
export default myReducer;