import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = (props) => {
    return (
        <div>
            <Notification store={props.store} />
            <h2>Anecdotes</h2>
            <AnecdoteList store={props.store} />
            <AnecdoteForm store={props.store} />
        </div>
    )
}

export default App