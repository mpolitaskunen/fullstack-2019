import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
    // Let's define the style for the Notifications
    const style = {
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '3px',
        padding: '15px',
        marginBottom: '50px'
    }

    // Ensure that the notificationStyle variable is empty...
    let notificationStyle = null

    if(props.notifications === null){
        return <div></div>
    }

    const message = props.notifications.message
    const type = props.notifications.mtype

    if (type === 'error') {
        // Error-type notifications have a red border...
        notificationStyle= { ...style, color: 'red' }
    } else {
        // Other notifications have a green border...
        notificationStyle= { ...style, color: 'green' }
    }

    if (message === null || message === '' || message === undefined) {
        return <div></div>
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        notifications: state.notifications
    }
}

export default connect(mapStateToProps, null)(Notification)