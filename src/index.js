import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import tableReducer from "./Reducers";
import thunk from "redux-thunk";

const store = createStore(tableReducer, applyMiddleware(thunk))
window.store = store
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
