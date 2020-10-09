import * as ACTION_TYPES from './types';

let initialData = {
    fetching: false,
    array: [],
    current: {},
    favorites: [],
    nextPage: 1
}
// reducer
export default function reducer(state = initialData, action) {
    switch (action.type) {
        case ACTION_TYPES.UPDATE_PAGE:
            return { ...state, nextPage: action.payload }

        case ACTION_TYPES.GET_FAVS_SUCCESS:
            return { ...state, fetching: false, favorites: action.payload }
        case ACTION_TYPES.GET_FAVS_ERROR:
            return { ...state, fetching: false, error: action.payload }
        case ACTION_TYPES.GET_FAVS:
            return { ...state, fetching: true }

        case ACTION_TYPES.ADD_TO_FAVORITES:
            return { ...state, ...action.payload }
        case ACTION_TYPES.REMOVE_CHARACTER:
            return { ...state, array: action.payload }

        case ACTION_TYPES.GET_CHARACTERS:
            return { ...state, fetching: true }
        case ACTION_TYPES.GET_CHARACTERS_ERROR:
            return { ...state, fetching: false, error: action.payload }
        case ACTION_TYPES.GET_CHARACTERS_SUCCESS:
            return { ...state, array: action.payload, fetching: false }
        default:
            return state
    }
}