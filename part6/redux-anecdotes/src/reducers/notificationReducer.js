// const initialState = 'Notified!'
// Removed, as it's not needed anymore

export const setNotification = (content) => {
    return {
        type: 'SET_NOTIFICATION',
        data:
            content,
    }
}

const reducer = (state = null, action) => {
    switch (action.type) {

    case 'SET_NOTIFICATION': {
        state = action.data
        return state
    }

    default: {
        return state
    }
    }
}

export default reducer
