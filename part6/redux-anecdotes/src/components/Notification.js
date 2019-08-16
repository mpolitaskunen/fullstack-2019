import React from 'react'

const Notification = (props) => {
    const notification = props.store.getState().notification
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }
    return (
        <div hidden={!notification} style={style}>
            {notification}
        </div>
    )
}

export default Notification