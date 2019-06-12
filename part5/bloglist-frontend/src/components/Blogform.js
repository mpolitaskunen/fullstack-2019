import React, { useState } from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'

// The form for creating a blog entry
const BlogForm = ({ blogs, setBlogs, notificationState, setNotificationState } ) => {
    const [newBlogTitle, setNewBlogTitle] = useState('')
    const [newBlogAuthor, setNewBlogAuthor] = useState('')
    const [newBlogUrl, setNewBlogUrl] = useState('')

    const blogFormRef = React.createRef()

    const handleBlogTitleChange = (event) => { setNewBlogTitle(event.target.value) }
    const handleBlogAuthorChange = (event) => { setNewBlogAuthor(event.target.value) }
    const handleBlogUrlChange = (event) => { setNewBlogUrl(event.target.value) }

    const addBlog = async (event) => {
        event.preventDefault()
        try {
            blogFormRef.current.toggleVisibility()

            const blogObject = {
                title: newBlogTitle,
                author: newBlogAuthor,
                url: newBlogUrl
            }

            const returnedBlog = await blogService.create(blogObject)

            const newState = {
                message: `Added a new entry: ${newBlogTitle} by ${newBlogAuthor}`,
                type: 'Event'
            }

            setBlogs(blogs.concat(returnedBlog))
            setNewBlogAuthor('')
            setNewBlogTitle('')
            setNewBlogUrl('')

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
                <div>Title: <input value={newBlogTitle} onChange={handleBlogTitleChange} /></div>
                <div>Author: <input value={newBlogAuthor} onChange={handleBlogAuthorChange} /></div>
                <div>URL: <input value={newBlogUrl} onChange={handleBlogUrlChange} /></div>
                <button type="submit">Save</button>
            </form>
        </Togglable>
    )
}

export default BlogForm