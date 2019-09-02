import usersService from '../services/users'

export const getUsers = () => {
    return async dispatch => {
        const users = await usersService.getAll()
        dispatch({
            type: 'GET_USERS',
            data: users
        })
    }
}

const userReducer = (state = [], action) => {
    switch (action.type) {

    case 'GET_USERS': {
        return action.data
    }

    default: {
        return state
    }
    }
}

export default userReducer