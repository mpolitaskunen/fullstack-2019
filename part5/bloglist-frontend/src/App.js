import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [newBlogTitle, setNewBlogTitle] = useState('')
    const [newBlogAuthor, setNewBlogAuthor] = useState('')
    const [newBlogUrl, setNewBlogUrl] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [notificationState, setNotificationState] = useState({
        message: null,
        type: null
    })

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const Footer = () => {
        const footerStyle = {
            color: 'black',
            fontStyle: 'bold',
            fontSize: 14
        }

        return (
            <div style={footerStyle}>
                <br />
                <em>Bloglist app - S. Taskunen 2019</em>
            </div>
        )
    }

    const login = async (event) => {
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

    const logout = async (event) => {
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

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleBlogTitleChange = (event) => {
        setNewBlogTitle(event.target.value)
    }

    const handleBlogAuthorChange = (event) => {
        setNewBlogAuthor(event.target.value)
    }

    const handleBlogUrlChange = (event) => {
        setNewBlogUrl(event.target.value)
    }

    const addBlog = async (event) => {
        event.preventDefault()
        try {
            const blogObject = {
                title: newBlogTitle,
                author: newBlogAuthor,
                url: newBlogUrl
            }

            const newState = {
                message: `Added a new entry: ${newBlogTitle} by ${newBlogAuthor}`,
                type: 'Event'
            }

            blogService
                .create(blogObject)
                .then(returnedBlog => {
                    setBlogs(blogs.concat(returnedBlog))
                    setNewBlogAuthor('')
                    setNewBlogTitle('')
                    setNewBlogUrl('')
                })

            setNotificationState(newState)
            setTimeout(() => {
                setNotificationState({ ...notificationState, message: null })
            }, 5000)

        } catch(exception) {
            const newState = {
                message: 'Adding a new entry failed',
                type: 'error'
            }
            setNotificationState(newState)
            setTimeout(() => {
                setNotificationState({ ...notificationState, message: null })
            }, 5000)
        }
    }

    const loginForm = () => {
        return (
            <div>
                <h2>Login to the Application</h2>
                <form onSubmit={login}>
                    <div>
                        Username
                        <input type="text" value={username} onChange={handleUsernameChange} />
                    </div>
                    <div>
                        Password
                        <input type="text" value={password} onChange={handlePasswordChange} />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }

    const blogForm = () => {
        return(
            <div>
                <form onSubmit={addBlog}>
                    <div>Blog Title <input value={newBlogTitle} onChange={handleBlogTitleChange} /></div>
                    <div>Blog Author <input value={newBlogAuthor} onChange={handleBlogAuthorChange} /></div>
                    <div>Blog URL <input value={newBlogUrl} onChange={handleBlogUrlChange} /></div>
                    <button type="submit">Save</button>
                </form>
            </div>
        )
    }

    const logoutForm = () => {
        return(
            <div>
                <form onSubmit={logout}>
                    <button type="submit">Logout</button>
                </form>
            </div>
        )
    }

    return (
        <div>
            <Notification state={notificationState} />
            <h2>Bloglist</h2>
            {user === null
                ? loginForm()
                : <div><p>{user.name} logged in</p> {blogForm()}</div>
            }
            {user !== null
                ? logoutForm()
                : <div></div>
            }
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
            <Footer/>
        </div>
    )
}

export default App