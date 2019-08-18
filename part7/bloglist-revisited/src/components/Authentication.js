import React, { useState, useEffect } from 'react'

import loginService from '../services/login'
import LoginForm from './LoginForm'
import LogoutForm from './LogoutForm'
import Togglable from './Togglable'
import { useField } from '../hooks'

const Authentication = ({ userHandler, notificationState, setNotificationState }) => {
    const uname = useField('username')
    const pword = useField('password')
    const [name, setName] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)

    const userInfoStorage = 'loggedBloglistappUser'

    const authFormRef = React.createRef()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem(userInfoStorage)

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            if(user.name) {
                setName(user.name)
            }

            setLoggedIn(true)
            userHandler(user)
        }
    // eslint-disable-next-line
    }, [])

    const loginHandler = async (event) => {
        event.preventDefault()
        try {
            let username = uname.value
            let password = pword.value

            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                userInfoStorage, JSON.stringify(user)
            )

            setName(user.name)

            window.location.href = '/'

            const newState = {
                message: 'Login succeeded',
                type: 'Event'
            }

            setNotificationState(newState)
            setTimeout(() => {
                setNotificationState({ ...notificationState, message: null })
            }, 5000)
        } catch (exception) {
            const newState = {
                message: 'The username or password is not valid',
                type: 'error'
            }
            setNotificationState(newState)
            setTimeout(() => {
                setNotificationState({ ...notificationState, message: null })
            }, 5000)
        }
    }

    const logoutHandler = async (event) => {
        event.preventDefault()
        try {
            window.localStorage.clear()
            window.localStorage.removeItem(userInfoStorage)
            userHandler(null)
            setLoggedIn(false)

            window.location.href = '/'

            const newState = {
                message: 'Logout succeeded. Have a nice day :)',
                type: 'Event'
            }

            setNotificationState(newState)
            setTimeout(() => {
                setNotificationState({ ...notificationState, message: null })
            }, 5000)
        } catch(exception) {
            const newState = {
                message: 'Logout failed',
                type: 'error'
            }

            setNotificationState(newState)
            setTimeout(() => {
                setNotificationState({ ...notificationState, message: null })
            }, 5000)
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
            {loggedIn === false
                ? loginForm()
                : <div><p>{name} logged in</p>{logoutForm()}</div>
            }
        </div>
    )
}

export default Authentication