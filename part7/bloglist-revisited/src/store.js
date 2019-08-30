import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
    blogs: blogReducer,
    notifications: notificationReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store