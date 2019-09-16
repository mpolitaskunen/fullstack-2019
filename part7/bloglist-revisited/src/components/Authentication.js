// External Imports here
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

// Components here
import LoginForm from './LoginForm'
import LogoutForm from './LogoutForm'
import Togglable from './Togglable'

// Hooks
import { useField } from '../hooks'

// Reducers
import { setUser, unsetUser, checkLogin } from '../reducers/authReducer'
import { setNotification } from '../reducers/notificationReducer'

const Authentication = (props) => {
    // Check if the user has already logged in...
    useEffect(() => {
        props.checkLogin()
    })

    // Define fields used in login process
    const uname = useField('username')
    const pword = useField('password')

    // Authentication form reference for login process
    const authFormRef = React.createRef()

    // Handle the login process
    const loginHandler = async (event) => {
        event.preventDefault()
        try {
            let username = uname.value
            let password = pword.value

            const user = {
                username: username,
                password: password
            }

            props.setUser(user)

            const newState = {
                message: 'Login succeeded',
                type: 'Event'
            }

            props.setNotification(newState)
        } catch (exception) {
            const newState = {
                message: 'The username or password is not valid',
                type: 'error'
            }
            props.setNotification(newState)
        }
    }

    const logoutHandler = async (event) => {
        event.preventDefault()
        try {
            props.unsetUser()
            const newState = {
                message: 'Logout succeeded. Have a nice day :)',
                type: 'Event'
            }
            props.setNotification(newState)
        } catch(exception) {
            const newState = {
                message: 'Logout failed',
                type: 'error'
            }

            props.setNotification(newState)
        }
    }

    const logoutForm = () => {
        return(
            <LogoutForm handleSubmit={logoutHandler} />
        )
    }

    const loginForm = () => {
        return(
            <Togglable buttonLabel='Login' ref={authFormRef}>
                <LoginForm username={uname} password={pword} handleSubmit={loginHandler} />
            </Togglable>
        )
    }

    return (
        <>
            {props.user === null
                ? loginForm()
                : <>{props.user.name} logged in {logoutForm()}</>
            }
        </>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = ({
    setNotification,
    setUser,
    unsetUser,
    checkLogin
})

export default connect(mapStateToProps, mapDispatchToProps)(Authentication)