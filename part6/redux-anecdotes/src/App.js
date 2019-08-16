import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

const App = () => {
    return (
        <div>
            <h1>The Anecdotes page</h1>
            <Notification />
            <Filter />
            <AnecdoteForm />
            <br/>
            <h2>Anecdotes</h2>
            <AnecdoteList />
        </div>
    )
}

export default App