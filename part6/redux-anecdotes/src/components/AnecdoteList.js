import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
    // Let's add simpler calls for the store contents..
    const { anecdotes, filter } = store.getState()

    const vote = (anecdote) => {
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
            {anecdotes
                .filter(anecdote => anecdote.content.toLowerCase()
                    .includes(filter.toLowerCase())
                )
                .map(anecdote =>
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