import {compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { legacy_createStore as createStore} from 'redux'
import rootReducer from './reducers';
import promiseMiddleware from './middleware/ApiCalls';

let middleware = [thunk, promiseMiddleware];

const reduxStore= createStore(
    rootReducer,
    compose(
        applyMiddleware(...middleware),
    )
);

export default reduxStore;