import React from 'react'
import { connect } from 'react-redux'
import { addDote } from '../reducers/anecdoteReducer'
import doteService from '../services/anecdotes'

const AnecdoteForm = ({ addDote }) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.newAnecdote.value
        event.target.newAnecdote.value = ''
        const newAnecdote = await doteService.createNew(content)
        console.log(content)
        console.log(newAnecdote)
        addDote(newAnecdote)
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