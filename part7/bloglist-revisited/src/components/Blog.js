import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addLike, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = (props) => {
    // Let's define a local state for the display box in bloglist
    const [blogState, setBlogState] = useState (false)

    // Let's define the blogStyle box style
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        paddingBottom: 10,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const blog = props.blog

    // Let's handle adding likes...
    const handleLike = async (event) => {
        event.preventDefault()

        try {
            blog.likes += 1
            await props.addLike(blog)

            const successNotification = {
                message: `Added a like to ${blog.title}`,
                mtype: 'event'
            }

            props.setNotification(successNotification)
        } catch(error) {
            const failureNotification = {
                message: error,
                mtype: 'error'
            }

            props.setNotification(failureNotification)
        }
    }

    // Handle the deletion/removal of items...
    const handleDelete = async (event) => {
        event.preventDefault()

        const entryId = blog.id

        try {
            if(window.confirm(`Are you sure you want to remove: ${blog.title} by ${blog.author}`)) {
                props.deleteBlog(entryId)

                const successNotification = {
                    message: `Removed entry: ${blog.title} by ${blog.author}`,
                    mtype: 'event'
                }

                props.setNotification(successNotification)
            }

        } catch(error) {
            const failureNotification = {
                message: error,
                mtype: 'error'
            }
            props.setNotification(failureNotification)
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
        if (blog.user.username === props.user.username) {
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
                <div><b>Likes: </b>{blog.likes}<button onClick={handleLike}>Like</button></div>
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

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        notification: state.notification
    }
}

const mapDispatchToProps = {
    setNotification,
    addLike,
    deleteBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)