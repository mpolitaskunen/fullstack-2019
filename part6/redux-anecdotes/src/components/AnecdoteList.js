import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ store }) => {
    const vote = (id) => {
        console.log('vote', id)
        store.dispatch(addVote(id))
        store.dispatch({ type: 'SORT' })
    }

    return(
        <div>
            {store.getState().map(anecdote =>
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
        </div>
    )
}

export default AnecdoteList