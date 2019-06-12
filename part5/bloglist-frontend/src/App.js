import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Authentication from './components/Authentication'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => {
    const [blogs, setBlogs] = useState([])

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
            <Authentication blogs={blogs} />
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}

            <Footer/>
        </div>
    )
}

export default App