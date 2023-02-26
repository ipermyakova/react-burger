import Reat from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'

import App from './components/app/app';
import React from 'react';
import  * as reducers  from './services/reducers'
import { Provider } from 'react-redux';
import { combineReducers, compose, createStore, applyMiddleware } from 'redux'
import './index.css'; 

const createReducer = () => combineReducers({
    ...reducers
})

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 

    const enhancer = composeEnhancers(
        applyMiddleware(thunk)
    )   

const store = createStore(createReducer(), enhancer)

ReactDOM.render(
    
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>     
    </React.StrictMode>,
    document.getElementById('root')
)

