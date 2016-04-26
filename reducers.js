import {reducer as formReducer} from 'redux-form';
import {
  REQUEST_WIPES, RECEIVE_WIPES
} from './actions'

function counter(state = 0, action) {
    switch (action.type) {
    case 'INCREMENT':
        return state + 1;
    case 'DECREMENT':
        return state - 1;
    default:
        return state;
    }
}

function user(state = {}, action) {
    if (action.type === 'USER' && action.user) {
        return action.user;
    }

    return state;
}

function wipes(state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) {
    switch (action.type) {
        case REQUEST_WIPES:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_WIPES:
            return Object.assign({}, state, {
                isFetching: false,
                items: action.wipes,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}

export default { counter, user, wipes, form: formReducer };
