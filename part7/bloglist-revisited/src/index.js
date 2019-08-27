import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'

import App from './App'

const reducer = combineReducers({
    blogs: blogReducer,
    notifications: notificationReducer
})

const store = createStore(reducer)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'))