import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Blog from './components/Blog'
import Authentication from './components/Authentication'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

import { getBlogs } from './reducers/blogReducer'

const App = ({ getBlogs, user, blogs }) => {
    // Let's get the blogs using the blogReducer
    useEffect(() => {
        getBlogs()
        // eslint-disable-next-line
    }, [])

    // Define the Footer for the page (probably going to move this somewhere else...)
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
            <Authentication className='login' />
            {user !== null
                ? <div><BlogForm className='blogForm' /></div>
                : <div></div>}
            {user !== null
                ? blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} className='blogList'/>)
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
        notifications: state.notifications,
        user: state.user
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)