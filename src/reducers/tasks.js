import * as types from './../constants/ActionTypes';

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : '';

//find index to change status 
var findIndex = (tasks, id) => {
    let result = -1;
    tasks.forEach((task, index) => {
        if (task.id === id) {
            result = index;
        }
    });
    return result;
}

var myReducer = (state = initialState, action) => {
    var id = '';
    var index = -1;
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
        case types.UPDATE_STATUS_TASK:
            // console.log(action);
            id = action.id;
            index = findIndex(state, id); //state = task

            state[index].status = !state[index].status;

            localStorage.setItem('tasks', JSON.stringify(state));
            // console.log(state);

            return [...state];
        case types.DELETE_TASK:

            id = action.id;
            index = findIndex(state, id); //state = task
            state.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(state));

            return [...state];
        default:
            return state;
    }

};

export default myReducer;