import React, { useState } from 'react'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const Blog = (props) => {
    // State engines for displaystate
    const [blogState, setBlogState] = useState(false)
    const [likes, setLikes] = useState(props.blog.likes)

    // Let's define the blogStyle box style
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        paddingBottom: 10,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const tempblog = props.blog
    console.log('Just under tempblog definition')
    console.log(typeof tempblog)
    console.log('And the type of props.blog...')
    console.log(typeof props.blog)
    console.log('Lets see what is inside props.blog..')
    console.log(props.blog)

    // Let's handle adding likes...
    const handleLike = async (event) => {
        event.preventDefault()

        const entryId = props.blog.id

        try {
            tempblog.likes += 1
            console.log('Before updatedEntry..')
            console.log(tempblog)
            const updatedEntry = await blogService.like({ tempblog, entryId })
            console.log('Under updatedEntry')
            console.log(updatedEntry)
            setLikes(updatedEntry.likes)
            props.setNotification({ type: 'event', message: `Added a like to ${tempblog.title}` })
        } catch(error) {
            props.setNotification({ type: 'error', message: error })
        }
    }

    const handleDelete = async (event) => {
        event.preventDefault()

        const entryId = props.blog.id

        try {
            if(window.confirm(`Are you sure you want to remove: ${tempblog.title} by ${tempblog.author}`)) {
                blogService.remove(entryId)
                props.setNotification({ type: 'event', message: `Removed entry: ${tempblog.title} by ${tempblog.author}` })
                props.setBlogs(props.blogs.filter(entry => entry.id !== entryId))
            }

        } catch(error) {
            props.setNotification({ type: 'error', message: error })
        }
    }

    // If the entry has a creator/owner/user assigned to it, show it, otherwise show Unknown
    const entryOwner = () => {
        if (tempblog.hasOwnProperty('user')) {
            return tempblog.user.name
        }
        return ('Unknown')
    }

    const deleteButton = () => {
        if (tempblog.user.username === props.user.username) {
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
                <b> Title: </b> {tempblog.title} <b> Author: </b> {tempblog.author}
            </div>
        )
    }

    // The long style entry
    const longForm = () => {
        return(
            <div style={showWhenVisible} onClick={() => setBlogState(false)} className='longform'>
                <div><b>Title: </b> {tempblog.title}</div>
                <div><b>Author: </b> {tempblog.author}</div>
                <div><b>URL: </b><a href={tempblog.url}>{tempblog.url}</a></div>
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

const mapDispatchToProps = {
    setNotification
}
export default connect(null, mapDispatchToProps)(Blog)