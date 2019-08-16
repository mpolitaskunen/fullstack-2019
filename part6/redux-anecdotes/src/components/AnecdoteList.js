import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
    const vote = (anecdote) => {
        console.log('vote', anecdote)

        // Add the vote
        store.dispatch(addVote(anecdote.id))
        store.dispatch({ type: 'SORT' })

        // Let's notify the user...
        store.dispatch(setNotification(`You voted for '${anecdote.content}'`))

        // After timeout, clear the notification
        setTimeout(() => {
            store.dispatch(setNotification(null))
        },5000)
    }

    return(
        <div>
            {store.getState().anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes} votes
                        <button onClick={() => vote(anecdote)}> vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList