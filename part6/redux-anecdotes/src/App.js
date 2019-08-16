import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import doteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

const App = () => {
    useEffect(() => {
        doteService
            .getAll().then(anecdotes => initializeAnecdotes(anecdotes))
    },[])

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

export default connect(null, { initializeAnecdotes })(App)