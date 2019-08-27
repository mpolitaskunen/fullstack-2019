import React from 'react'
import { connect } from 'react-redux'

import Togglable from './Togglable'
import blogService from '../services/blogs'
import { useField } from '../hooks'
import { setNotification } from '../reducers/notificationReducer'

// The form for creating a blog entry
const BlogForm = (props) => {
    const blogTitle = useField('Blogtitle')
    const blogUrl = useField('BlogUrl')
    const blogAuthor = useField('BlogAuthor')

    const blogFormRef = React.createRef()

    const addBlog = async (event) => {
        event.preventDefault()
        try {
            blogFormRef.current.toggleVisibility()

            const blogObject = {
                title: blogTitle.value,
                author: blogAuthor.value,
                url: blogUrl.value
            }

            const returnedBlog = await blogService.create(blogObject)

            const newState = {
                message: `Added a new entry: ${blogTitle.value} by ${blogAuthor.value}`,
                type: 'Event',
                time: 5
            }

            props.setBlogs(props.blogs.concat(returnedBlog))
            blogTitle.reset()
            blogAuthor.reset()
            blogUrl.reset()

            props.setNotification(newState)

        } catch(exception) {
            const newState = {
                message: 'Adding a new entry failed',
                type: 'error',
                time: 5
            }
            props.setNotification(newState)
        }
    }

    return (
        <Togglable buttonLabel='New Entry' ref={blogFormRef}>
            <h2>Create a new Blog entry</h2>
            <form onSubmit={addBlog}>
                <div>Title: <input {...blogTitle.noReset()} /></div>
                <div>Author: <input {...blogAuthor.noReset()} /></div>
                <div>URL: <input {...blogUrl.noReset()} /></div>
                <button type="submit">Save</button>
            </form>
        </Togglable>
    )
}

const mapDispatchToProps = {
    setNotification
}

export default connect(null, mapDispatchToProps)(BlogForm)