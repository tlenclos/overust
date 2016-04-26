import fetch from 'isomorphic-fetch'

export const REQUEST_WIPES = 'REQUEST_WIPES'
function requestWipes() {
  return {
    type: REQUEST_WIPES
  }
}

export const RECEIVE_WIPES = 'RECEIVE_WIPES'
function receiveWipes(json) {
  return {
    type: RECEIVE_WIPES,
    wipes: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

export function fetchWipes() {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestWipes())

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch('/api/wipe', {
      credentials: 'include',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
    .then(response => response.json())
    .then(json =>

      // We can dispatch many times!
      // Here, we update the app state with the results of the API call.

      dispatch(receiveWipes(json))
    );

    // In a real world app, you also want to
    // catch any error in the network call.
  }
}
