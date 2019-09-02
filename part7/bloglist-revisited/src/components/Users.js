// Imported external libraries and functions here
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

// Components here
import UsersTableRow from './UsersTableRow'

// Reducers here
import { getUsers } from '../reducers/usersReducer'


const Users = ({ user, users, getUsers }) => {
    // Let's populate the users store
    useEffect(() => {
        // If the user store is empty, return nothing, as the user is not logged in
        if(user !== null) {
            getUsers()
        }
    // eslint-disable-next-line
    }, [])

    return (
        <div>
            <h2>Users</h2>
            <table>
                <tbody>
                    <tr>
                        <th>User</th>
                        <th>Blog count</th>
                    </tr>
                    {users.map(u => (
                        <tr key={u.id}>
                            <UsersTableRow mappedUser={u} />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = (state) => ({
    users: state.users,
    user: state.user
})

const mapDispatchToProps = ({
    getUsers
})

export default connect(mapStateToProps, mapDispatchToProps)(Users)
