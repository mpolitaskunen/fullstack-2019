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
            Create a new Anecdote:
            <form onSubmit={addAnecdote}>
                <div>
                    <input name="newAnecdote" />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm