import React from 'react'
import { addDote } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({ store }) => {
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        store.dispatch(addDote(content))
        event.target.newAnecdote.value = ''
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name="newAnecdote" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm