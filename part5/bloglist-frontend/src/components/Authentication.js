import React, { useState, useEffect } from 'react'

import loginService from '../services/login'
import blogService from '../services/blogs'
import LoginForm from './LoginForm'
import Togglable from './Togglable'
import Notification from './Notification'
import BlogForm from './BlogForm'

const Authentication = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [user, setUser] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)
    const [notificationState, setNotificationState] = useState({
        message: null,
        type: null
    })

    const loginFormRef = React.createRef()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            if(user.name) {
                setName(user.name)
            }

            setLoggedIn(true)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const loginHandler = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedBloglistappUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)

            setUser(user)
            setUsername('')
            setPassword('')

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
        try {
            window.localStorage.clear()
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
            },5000)
        }
    }

    const logoutForm = () => {
        return(
            <Togglable buttonLabel='Logout'>
                <form onSubmit={logoutHandler} />
            </Togglable>
        )
    }

    const loginForm = () => {
        return(
            <Togglable buttonLabel='Login' >
                <LoginForm
                    username={username}
                    password={password}
                    handleUsernameChange={({ target }) => setUsername(target.value)}
                    handlePasswordChange={({ target }) => setPassword(target.value)}
                    handleSubmit={loginHandler} />
            </Togglable>
        )
    }

    return (
        <div>
            {loggedIn === false
                ? loginForm()
                : <div><p>{user.name} logged in</p> <BlogForm blogs={props.blogs} /></div>
            }
            {loggedIn === true
                ? logoutForm()
                : <div></div>
            }
        </div>
    )
}

export default Authentication