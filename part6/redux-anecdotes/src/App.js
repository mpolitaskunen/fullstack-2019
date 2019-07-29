import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import { addDote, addVote } from './reducers/anecdoteReducer'

const App = (props) => {
    const anecdotes = props.store.getState()

    const vote = (id) => {
        console.log('vote', id)
        props.store.dispatch(addVote(id))
        props.store.dispatch({ type: 'SORT' })
    }


    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
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
            <AnecdoteForm store={props.store} />
        </div>
    )
}

export default App