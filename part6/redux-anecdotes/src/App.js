import React from 'react'
import { addDote, addVote } from './reducers/anecdoteReducer'

const App = (props) => {
    const anecdotes = props.store.getState()

    const vote = (id) => {
        console.log('vote', id)
        props.store.dispatch(addVote(id))
    }

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        props.store.dispatch(addDote(content))
        event.target.newAnecdote.value = ''
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes} votes
                        <button onClick={() => vote(anecdote.id)}> vote</button>
                    </div>
                </div>
            )}
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="newAnecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default App