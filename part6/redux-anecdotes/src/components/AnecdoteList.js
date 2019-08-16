import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const vote = (anecdote) => {
        // Add the vote
        props.addVote(anecdote)

        // Let's notify the user...
        props.setNotification(`You voted for '${anecdote.content}'`, 5)
    }

    return(
        <div>
            {props.anecdotes
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
        anecdotes: state.anecdotes
            .filter(anecdote => anecdote.content.toLowerCase()
                .includes(state.filter.toLowerCase())
            )
            .slice().sort((a,b) => b.votes - a.votes),
        filter: state.filter
    }
}

const mapDispatchToProps = {
    addVote,
    setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)