import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Blog from './components/Blog'
import Authentication from './components/Authentication'
import Notification from './components/Notification'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'

import { getBlogs } from './reducers/blogReducer'

const App = (props) => {
    const [user, setUser] = useState(null)

    // Let's get the blogs using the blogReducer
    useEffect(() => {
        props.getBlogs()
    }, [])

    // Create a user handler..
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
            <Notification />
            <h2>Bloglist</h2>
            <Authentication userHandler={userHandler} className='login' />
            {user !== null
                ? <div><BlogForm className='blogForm' /></div>
                : <div></div>}
            {user !== null
                ? props.blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} user={user} className='blogList'/>)
                : <div></div>
            }

            <Footer/>
        </div>
    )
}

const mapDispatchToProps = {
    getBlogs
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        notifications: state.notifications
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)