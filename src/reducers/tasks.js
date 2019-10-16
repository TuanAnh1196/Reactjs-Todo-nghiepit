import * as types from './../constants/ActionTypes';

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : '';

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.ADD_TASK:
            var newTask = {
                id: 1 + (Math.random() * (1000 - 1)),
                name: action.task.name,
                status: action.status === 'true' ? true : false,
            }
            state.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(state));

            return [...state];
        default:
            return state;
    }

};

export default myReducer;