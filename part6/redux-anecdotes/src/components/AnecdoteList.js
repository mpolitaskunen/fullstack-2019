import React from 'react'
import { connect } from 'react-redux'
import { addVote, sortList } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({
    addVote,
    setNotification,
    anecdotes,
    filter }) => {

    const vote = (anecdote) => {
        // Add the vote
        addVote(anecdote.id)
        // Sort the list
        sortList()

        // Let's notify the user...
        setNotification(`You voted for '${anecdote.content}'`)

        // After timeout, clear the notification
        setTimeout(() => {
            setNotification(null)
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter
    }
}

const mapDispatchToProps = {
    addVote,
    setNotification,
    sortList
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)