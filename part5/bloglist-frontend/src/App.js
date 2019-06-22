import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Authentication from './components/Authentication'
import Notification from './components/Notification'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [notificationState, setNotificationState] = useState({
        message: null,
        type: null
    })

    useEffect(() => {
        blogService
            .getAll()
            .then(blogs =>
                setBlogs( blogs.sort(function (a,b) { return b.likes - a.likes }) )
            )
    // eslint-disble-next-line
    }, [])

    const userHandler = (user) => {
        setUser(user)
        blogService.setUser(user ? user : '')
    }


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

    return (
        <div>
            <Notification state={notificationState} />
            <h2>Bloglist</h2>
            <Authentication userHandler={userHandler} notifications={notificationState} notificationState={setNotificationState} className='login' />
            {user !== null
                ? <div><BlogForm blogs={blogs} setBlogs={setBlogs} notificationState={notificationState} setNotificationState={setNotificationState} className='blogForm' /></div>
                : <div></div>}
            {user !== null
                ? blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} notificationState={notificationState} setNotificationState={setNotificationState} setBlogs={setBlogs} blogs={blogs} user={user} className='blogList'/>)
                : <div></div>
            }

            <Footer/>
        </div>
    )
}

export default App