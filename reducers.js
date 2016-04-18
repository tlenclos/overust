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
    if (action.type === 'USER') {
        return action.user;
    }

    return state;
}

export default { counter, user };
