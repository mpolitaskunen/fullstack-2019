export const setNotification = (content, time) => {
    return dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: content,
        })

        setTimeout(() => {
            dispatch({
                type: 'SET_NOTIFICATION',
                data: null,
            })
        }, time * 1000)
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
