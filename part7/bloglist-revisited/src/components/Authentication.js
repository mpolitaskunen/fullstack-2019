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
    const uname = useField('username')
    const pword = useField('password')

    const userInfoStorage = 'loggedBloglistappUser'

    const authFormRef = React.createRef()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem(userInfoStorage)

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)

            props.setUser(user)
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

    console.log('Authentication.js before return of the form')
    console.log(props.user)

    return (
        <div>
            {props.user === null
                ? loginForm()
                : <div><p>{props.user.name} logged in</p>{logoutForm()}</div>
            }
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