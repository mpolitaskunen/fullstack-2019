// External used libraries here
import React from 'react'
import { connect } from 'react-redux'

// Reducers here
import { getUsers } from '../reducers/usersReducer'

const User = ({ getUsers, users, id }) => {
    // Check if the users store is empty, fill it if it is
    if(users.length === 0) {
        getUsers()
    }

    const userInfo = users.find(user => user.id === id)

    // If the data returned is undefined, return nothing. This
    // should also help initialize the data for display
    if(userInfo === undefined) {
        return null
    }

    return (
        <div>
            <h2>{userInfo.name}</h2>
            <h3>Added Blogentries: </h3>
            <ul>
                {userInfo.entries.map(blog => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => ({
    users: state.users
})

const mapDispatchToProps = ({
    getUsers
})

export default connect(mapStateToProps,mapDispatchToProps)(User)