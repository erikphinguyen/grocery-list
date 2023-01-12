import { csrfFetch } from './csrf';

// TYPES
const GET_TASKS = 'tasks/get_tasks';
const POST_TASKS = 'tasks/post_tasks';
const PUT_TASKS = 'tasks/put_tasks'
const DELETE_TASKS = 'tasks/delete_tasks';

// ACTION CREATORS
const getTasks = (tasks) => ({
    type: GET_TASKS,
    tasks
});

const postTasks = (task) => ({
    type: POST_TASKS,
    task
});

const putTasks = (task) => ({
    type: PUT_TASKS,
    task
});

const deleteTasks = (id) => ({
    type: DELETE_TASKS,
    id
});

// THUNKS
export const thunkGetTasks = (id) => async (dispatch) => {
    console.log('AM I INSIDE THUNK GET TASKS?')
    const response = await csrfFetch(`/api/tasks/${id}`);
    if (response.ok) {
        const tasks = await response.json();
        dispatch(getTasks(tasks));
    }
}

export const thunkPostTasks = (data) => async (dispatch) => {
    const response = await csrfFetch(`/api/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        const newTask = await response.json();
        dispatch(postTasks(newTask));
        return newTask;
    }
}

export const thunkPutTasks = (data) => async (dispatch) => {
    const response = await csrfFetch(`/api/tasks/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        const updatedTask = await response.json();
        dispatch(putTasks(updatedTask));
        return updatedTask;
    }
}

export const thunkDeleteTasks = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/tasks/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(deleteTasks(id));
        // return id;
    }
}

// REDUCER
const tasksReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_TASKS:
            const getState = {};
            action.tasks.forEach(task => {
                getState[task.id] = task;
            });
            return {
                ...getState
            }
        case POST_TASKS:
            const postState = { ...state };
            postState[action.task] = action.task;
            return postState;
        case PUT_TASKS:
            return {
                ...state,
                [action.task.id]: action.task
            }
        case DELETE_TASKS:
            const deleteState = { ...state };
            delete deleteState[action.id];
            return deleteState;
        default:
            return state;
    }
}

export default tasksReducer;
