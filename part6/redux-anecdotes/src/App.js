import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

const App = (props) => {
    return (
        <div>
            <h1>The Anecdotes page</h1>
            <Notification store={props.store} />
            <Filter store={props.store} />
            <AnecdoteForm store={props.store} />
            <br/>
            <h2>Anecdotes</h2>
            <AnecdoteList store={props.store} />
        </div>
    )
}

export default App