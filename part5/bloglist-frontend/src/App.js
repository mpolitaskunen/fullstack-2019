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
    const [errorMessage, setErrorMessage] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
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

            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Username or password not valid')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
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

    const addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            title: newBlogTitle,
            author: newBlogAuthor,
            url: newBlogUrl
        }

        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                setNewBlogAuthor('')
                setNewBlogTitle('')
                setNewBlogUrl('')
            })
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

    return (
        <div>
            <Notification message={errorMessage} />
            <h2>Bloglist</h2>
            {user === null
                ? loginForm()
                : <div><p>{user.name} logged in</p> {blogForm()}</div>
            }
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
            <Footer/>
        </div>
    )
}

export default App