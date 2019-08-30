export const setUser = (user) => {
    return async dispatch => {
        await dispatch({
            type: 'SET_USER',
            username: user.username,
            name: user.name
        })
    }
}

export const unsetUser = () => {
    return async dispatch => {
        await dispatch({
            type: 'UNSET_USER'
        })
    }
}

export const authReducer = (state = null, action) => {
    switch (action.type) {
    case 'SET_USER': {
        state = { ...state, username: action.username, name: action.name }
        return state
    }

    case 'UNSET_USER': {
        state = { ...state, user: null }
        return state
    }

    default: {
        return state
    }
    }
}

export default authReducer