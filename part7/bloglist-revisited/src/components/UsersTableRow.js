import React from 'react'
import { Link } from 'react-router-dom'

const UsersTableRow = ({ mappedUser }) => {
    return (
        <>
            <td><Link to={`/users/${mappedUser.id}`}>{mappedUser.name}</Link></td>
            <td>{mappedUser.entries.length}</td>
        </>
    )
}

export default UsersTableRow