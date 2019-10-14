import { createStore } from 'redux';
import {status, sort} from './actions/index';
import myReducer from './reducers/index';



const store = createStore(myReducer);

console.log('default:',store.getState()); 

//Thay doi status 
store.dispatch(status());

console.log('action: ',store.getState()); 

//sap xep Ten Z-A
store.dispatch(sort(sort({
    by: 'name',
    value: -1
})));

console.log('sortaction: ',store.getState()); 
