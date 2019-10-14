import { createStore } from 'redux';

var initialState = {
    status: false,
    sort: {
        by: 'name',
        value: 1
    }

}

var myReducer = (state = initialState, action) => {
    if(action.type === 'TOGGLE_STATUS'){
        state.status = !state.status;
    }
    if(action.type==='SORT'){
        var {by, value} = action.sort;
        var {status} = state; //status = state.status
        return {
            status: status,
            sort: {
                by: by,
                value: value
            }
        }
    }
    return state;
}


const store = createStore(myReducer);

console.log('defaul:',store.getState()); 

//Thay doi status 
var action = { type : 'TOGGLE_STATUS' }
store.dispatch(action);

console.log('action: ',store.getState()); 

//sap xep Ten Z-A
var sortAction ={ 
    type: 'SORT',
    sort: {
        by: 'name',
        value: -1
    }
}
store.dispatch(sortAction);

console.log('sortaction: ',store.getState()); 
