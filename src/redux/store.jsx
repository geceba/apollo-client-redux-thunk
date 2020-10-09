import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from './user/userReducer';
import { restoreSessionAction } from './user/userActions'
import charsReducer from './chars/charsReducer';
import { getCharactersAction } from './chars/charsAction';
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