import React from 'react'

const Notification = ( {state} ) => {
    const message = state.message
    const type = state.type

    if (message === null) {
        return null
    }

    // Let's define the style for the Notifications
    const style = {
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '3px',
        padding: '15px',
        marginBottom: '50px'
    }

    let notificationStyle = null;

    if (type === 'error') {
        // And let's add color (red) for the error messages/notifications
        notificationStyle= { ...style, color: 'red' }
    } else {
        // And green for other messages/notifications
        notificationStyle= { ...style, color: 'green' }
    }

    // And let's return the message styled to the caller
    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification