import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import doteService from './services/anecdotes'
import anecdoteReducer, { initializeAnecdotes } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers( {
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
})

const store = createStore(reducer)

doteService.getAll().then(anecdotes =>
    store.dispatch(initializeAnecdotes(anecdotes))
)

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    )
}

render()
store.subscribe(render)