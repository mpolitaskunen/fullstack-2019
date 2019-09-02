// External imports here
import React from 'react'
import { connect } from 'react-redux'

// Components here...
import Togglable from './Togglable'

// Hooks
import { useField } from '../hooks'

// Reducers
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

// The form for creating a blog entry
const BlogForm = (props) => {
    const blogTitle = useField('Blogtitle')
    const blogUrl = useField('BlogUrl')
    const blogAuthor = useField('BlogAuthor')

    const blogFormRef = React.createRef()

    const token = props.user.token

    const addBlog = async (event) => {
        event.preventDefault()
        try {
            blogFormRef.current.toggleVisibility()

            const blogObject = {
                title: blogTitle.value,
                author: blogAuthor.value,
                url: blogUrl.value,
            }

            // Call the Reducer for adding a new Blog Object
            props.addBlog({
                newObject: blogObject,
                token: token
            })

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
        <>
        <Togglable buttonLabel='New Entry' ref={blogFormRef}>
            <h2>Create a new Blog entry</h2>
            <form onSubmit={addBlog}>
                <div>Title: <input {...blogTitle.noReset()} /></div>
                <div>Author: <input {...blogAuthor.noReset()} /></div>
                <div>URL: <input {...blogUrl.noReset()} /></div>
                <button type="submit">Save</button>
            </form>
        </Togglable>
        <br />
        </>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = {
    setNotification,
    addBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogForm)