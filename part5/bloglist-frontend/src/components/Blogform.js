import React, { useState } from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import { useField } from '../hooks'

// The form for creating a blog entry
const BlogForm = ({ blogs, setBlogs, notificationState, setNotificationState } ) => {
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
                type: 'Event'
            }

            setBlogs(blogs.concat(returnedBlog))
            blogTitle.reset()
            blogAuthor.reset()
            blogUrl.reset()

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

    return (
        <Togglable buttonLabel='New Entry' ref={blogFormRef}>
            <h2>Create a new Blog entry</h2>
            <form onSubmit={addBlog}>
                <div>Title: <input {...blogTitle} /></div>
                <div>Author: <input {...blogAuthor} /></div>
                <div>URL: <input {...blogUrl} /></div>
                <button type="submit">Save</button>
            </form>
        </Togglable>
    )
}

export default BlogForm