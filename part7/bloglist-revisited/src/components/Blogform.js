import React from 'react'
import { connect } from 'react-redux'

import Togglable from './Togglable'
import { useField } from '../hooks'
import { addBlog } from '../reducers/blogReducer'
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

            // Call the Reducer for adding a new Blog Object
            props.addBlog(blogObject)

            const newState = {
                message: `Added a new entry: ${blogTitle.value} by ${blogAuthor.value}`,
                mtype: 'Event'
            }

            blogTitle.reset()
            blogAuthor.reset()
            blogUrl.reset()

            props.setNotification(newState)

        } catch(exception) {
            const newState = {
                message: 'Adding a new entry failed',
                mtype: 'error'
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
    setNotification,
    addBlog
}

export default connect(null, mapDispatchToProps)(BlogForm)