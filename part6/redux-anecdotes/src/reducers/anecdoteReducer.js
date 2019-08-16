import doteService from '../services/anecdotes'

export const addDote = anecdote => {
    return async dispatch => {
        const newAnecdote = await doteService.createNew(anecdote)
        dispatch({
            type: 'NEW',
            data: newAnecdote
        })
    }
}

export const addVote = (id) => {
    return {
        type: 'VOTE',
        data: { id }
    }
}

export const initializeAnecdotes = (anecdotes) => {
    return async dispatch => {
        const anecdotes = await doteService.getAll()
        dispatch({
            type: 'INITIALIZE_ANECDOTES',
            data: anecdotes,
        })
    }
}

const reducer = (state = [], action) => {
    switch(action.type) {

    case 'NEW': {
        return state.concat(action.data)
    }

    case 'INITIALIZE_ANECDOTES': {
        return action.data
    }

    case 'VOTE': {
        const id = action.data.id
        const anecdote = state.find(n => n.id === id)
        const changedDote = {
            ...anecdote,
            votes: anecdote.votes + 1
        }
        return state.map(dote => dote.id !== id ? dote : changedDote)
    }

    default:
        return state
    }
}

export default reducer