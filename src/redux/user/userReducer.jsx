import { LOGIN_ERROR, LOGIN_SUCCESS, LOGIN, LOG_OUT } from './types'
let initialData = {
    loggedIn: false,
    fetching: false
}


// reducer
export default function reducer(state = initialData, action) {
    switch (action.type) {
        case LOG_OUT:
            return { ...initialData }
        case LOGIN_SUCCESS:
            return { ...state, fetching: false, ...action.payload, loggedIn: true }
        case LOGIN_ERROR:
            return { ...state, fetching: false, error: action.payload }
        case LOGIN:
            return { ...state, fetching: true }
        default:
            return state
    }
}