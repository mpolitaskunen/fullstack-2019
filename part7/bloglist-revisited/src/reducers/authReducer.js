import loginService from '../services/login'
import blogService from  '../services/blogs'

export const checkLogin = () => {
    return async (dispatch) => {
        // Fetch variable from browser memory and set properties if it exists
        const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            dispatch({
                type: 'SET_USER',
                data: user
            })
        }
    }
}

export const setUser = (user) => {
    return async dispatch => {
        const login = await loginService.login(user)
        window.localStorage.setItem(
            'loggedBloglistappUser', JSON.stringify(login)
        )
        blogService.setToken(login.token)
        dispatch({
            type: 'SET_USER',
            data: user
        })
    }
}

export const unsetUser = () => {
    window.localStorage.clear()
    window.localStorage.removeItem('loggedBloglistappuser')
    return async dispatch => {
        await dispatch({
            type: 'UNSET_USER'
        })
    }
}

export const authReducer = (state = null, action) => {
    switch (action.type) {
    case 'SET_USER': {
        return action.data
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