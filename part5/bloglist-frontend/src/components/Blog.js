import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, blogs, setNotificationState, notificationState, user }) => {
    // State engines for displaystate
    const [blogState, setBlogState] = useState(false)
    const [likes, setLikes] = useState(blog.likes)

    // Let's define the blogStyle box style
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        paddingBottom: 10,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    // Let's handle adding likes...
    const handleLike = async (event) => {
        event.preventDefault()

        const entryId = blog.id

        try {
            blog.likes += 1
            const updatedEntry = await blogService.like({ blog, entryId })
            setLikes(updatedEntry.likes)
            setNotificationState({ type: 'event', message: `Added a like to ${blog.title}` })
            setTimeout(() => {
                setNotificationState({ ...notificationState, message: null })
            }, 5000)
        } catch(error) {
            setNotificationState({ type: 'error', message: error })
            setTimeout(() => {
                setNotificationState({ ...notificationState, message: null })
            }, 5000)

        }
    }

    const handleDelete = async (event) => {
        event.preventDefault()

        const entryId = blog.id

        try {
            if(window.confirm(`Are you sure you want to remove: ${blog.title} by ${blog.author}`)) {
                blogService.remove(entryId)
                setNotificationState({ type: 'event', message: `Removed entry: ${blog.title} by ${blog.author}` })
                setTimeout(() => {
                    setNotificationState({ ...notificationState, message: null })
                }, 5000)
                setBlogs(blogs.filter(entry => entry.id !== entryId))
            }

        } catch(error) {
            setNotificationState({ type: 'error', message: error })
            setTimeout(() => {
                setNotificationState({ ...notificationState, message: null })
            }, 5000)

        }
    }

    // If the entry has a creator/owner/user assigned to it, show it, otherwise show Unknown
    const entryOwner = () => {
        if (blog.hasOwnProperty('user')) {
            return blog.user.name
        }
        return ('Unknown')
    }

    const deleteButton = () => {
        if (blog.user.username === user.username) {
            return <><button onClick={handleDelete}>Delete</button></>
        }
        return null
    }

    // Constants for divStyles to either display or hide a div
    const hideWhenVisible = { display: blogState ? 'none' : '' }
    const showWhenVisible = { display: blogState ? '' : 'none' }

    // The short style entry
    const shortForm = () => {
        return(
            <div style={hideWhenVisible} onClick={() => setBlogState(true)} className='shortform'>
                <b> Title: </b> {blog.title} <b> Author: </b> {blog.author}
            </div>
        )
    }

    // The long style entry
    const longForm = () => {
        return(
            <div style={showWhenVisible} onClick={() => setBlogState(false)} className='longform'>
                <div><b>Title: </b> {blog.title}</div>
                <div><b>Author: </b> {blog.author}</div>
                <div><b>URL: </b><a href={blog.url}>{blog.url}</a></div>
                <div><b>Likes: </b>{likes}<button onClick={handleLike}>Like</button></div>
                <div><b>Entry owner: </b>{entryOwner()}</div>
                <div>{deleteButton()}</div>
            </div>
        )
    }

    // And return the field to the origin
    return (
        <div style={blogStyle} className='blogEntry'>
            {blogState === false
                ? shortForm()
                : longForm()}
        </div>
    )
}

export default Blog