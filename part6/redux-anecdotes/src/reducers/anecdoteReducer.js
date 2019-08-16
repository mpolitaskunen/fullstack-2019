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

export const addVote = id => {
    return async dispatch => {
        const vote = await doteService.vote(id)
        dispatch({
            type: 'VOTE',
            data: vote
        })
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
        const voted = action.data
        return state
            .map(dote => dote.id !== voted.id ? dote : voted)
    }

    default:
        return state
    }
}

export default reducer