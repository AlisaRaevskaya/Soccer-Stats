import { applyMiddleware, createStore } from "redux";

import { createLogger } from 'redux-logger';
//lets you replay problems as if they happened in your own browser.

import thunk from 'redux-thunk';
//With a plain basic Redux store, you can only do simple synchronous updates by dispatching an action. Middleware extends the store's abilities, 
//and lets you write async logic that interacts with the store.
import promise from 'redux-promise-middleware';

import reducer from './reducers';

const middleware = applyMiddleware(promise, thunk, createLogger());
export const store = createStore();
