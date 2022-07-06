import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, GET_USER } from '../actions/actions';

function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;

        default:
            return state;
    }
}

function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            return action.value;

        default:
            return state;
    }
}

function getUser(state = {}, action) {
    switch (action.type) {
        case GET_USER:
            return action.value;

        default:
            return state;
    }
}

const moviesApp = combineReducers({
    visibilityFilter, movies, getUser
});


export default moviesApp;