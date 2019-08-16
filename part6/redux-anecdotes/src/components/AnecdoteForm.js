import React from 'react'
import { connect } from 'react-redux'
import { addDote } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({ addDote }) => {
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        addDote(content)
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

export default connect(null, { addDote })(AnecdoteForm)