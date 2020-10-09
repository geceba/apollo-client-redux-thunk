import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer, { restoreSessionAction } from './userDuck';
import charsReducer, { getCharactersAction } from './charsDuck';
import thunk from 'redux-thunk';

let rootReducer = combineReducers({
    user: userReducer,
    characters: charsReducer,
});
const initialState = {};
const middleware = [thunk];

export default function generateStore() {
    let store = createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(...middleware))
    );

    getCharactersAction()(store.dispatch, store.getState);
    restoreSessionAction()(store.dispatch);
    return store;
}