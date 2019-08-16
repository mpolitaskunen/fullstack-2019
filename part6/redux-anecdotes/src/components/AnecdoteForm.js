import React from 'react'
import { connect } from 'react-redux'
import { addDote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        event.target.newAnecdote.value = ''
        props.addDote(content)
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