const initialState = null

export const setNotification = (message, model) => {
    return dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            message,
            model
        })
        setTimeout(() => dispatch(endNotification()), 5000)
    }
}

export const endNotification = () => {
    return {
        type: 'END_NOTIFICATION'
    }
}

const notificationReducer = (state = initialState, action) => {
    switch(action.type){

    // Create the case for setting notifications...
    case 'SET_NOTIFICATION':
        return action.message

    // Create the case for ending notifications
    case 'END_NOTIFICATION':
        return ''

    default:
        return state
    }
}

export default notificationReducer