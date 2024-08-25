import { reducer as newsDataReducer } from "./newsUpdateReducer/newsReducer";
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
    newsDataReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));