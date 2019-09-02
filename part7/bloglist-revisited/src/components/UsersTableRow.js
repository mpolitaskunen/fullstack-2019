import React from 'react'

const UsersTableRow = ({ mappedUser }) => {
    return (
        <>
            <td>{mappedUser.name}</td>
            <td>{mappedUser.entries.length}</td>
        </>
    )
}

export default UsersTableRow