import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import loginService from '../services/login'
import LoginForm from './LoginForm'
import LogoutForm from './LogoutForm'
import Togglable from './Togglable'
import { setUser, unsetUser } from '../reducers/authReducer'
import { useField } from '../hooks'
import { setNotification } from '../reducers/notificationReducer'

const Authentication = (props) => {
    // Define fields used in login process
    const uname = useField('username')
    const pword = useField('password')

    // Create information storage variable for storing the login information inside the browser
    const userInfoStorage = 'loggedBloglistappUser'

    // Authentication form reference for login process
    const authFormRef = React.createRef()

    // Check if the browser already contains the needed information for login
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem(userInfoStorage)

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)

            props.setUser(user)
        }
    // eslint-disable-next-line
    }, [])

    // Handle the login process
    const loginHandler = async (event) => {
        event.preventDefault()
        try {
            let username = uname.value
            let password = pword.value

            // Attempt to login using the login service
            const user = await loginService.login({
                username, password,
            })

            // Add the login information (token) to the browser
            window.localStorage.setItem(
                userInfoStorage, JSON.stringify(user)
            )

            window.location.href = '/'

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
            window.localStorage.clear()
            window.localStorage.removeItem(userInfoStorage)

            window.location.href = '/'

            const newState = {
                message: 'Logout succeeded. Have a nice day :)',
                type: 'Event'
            }

            props.unsetUser()
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
            <div>
                <LogoutForm
                    handleSubmit={logoutHandler} />
            </div>
        )
    }

    const loginForm = () => {
        return(
            <Togglable buttonLabel='Login' ref={authFormRef}>
                <LoginForm
                    username={uname}
                    password={pword}
                    handleSubmit={loginHandler} />
            </Togglable>
        )
    }

    return (
        <div>
            {props.user === null
                ? loginForm()
                : <div><p>{props.user.name} logged in</p>{logoutForm()}</div>
            }
            <br />
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = {
    setNotification,
    setUser,
    unsetUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication)