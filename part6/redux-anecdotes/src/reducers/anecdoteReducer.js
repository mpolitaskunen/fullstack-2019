// const anecdotesAtStart = [
//    'If it hurts, do it more often',
//    'Adding manpower to a late software project makes it later!',
//    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//    'Premature optimization is the root of all evil.',
//    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
//]

// const getId = () => (100000 * Math.random()).toFixed(0)

//const asObject = (anecdote) => {
//    return {
//        content: anecdote,
//        id: getId(),
//        votes: 0
//    }
//}

export const addDote = (anecdote) => {
    return {
        type: 'NEW',
        data: {
            content: anecdote,
            votes: 0
        }
    }
}

export const addVote = (id) => {
    return {
        type: 'VOTE',
        data: { id }
    }
}

export const initializeAnecdotes = (anecdotes) => {
    return {
        type: 'INITIALIZE_ANECDOTES',
        data: anecdotes,
    }
}

// const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {
    // Let's disable this console message...
    // console.log('anecdoteReducer: state, action: ', state, action)

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