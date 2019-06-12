import React from 'react'

const LoginForm = ({ handleSubmit }) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <button type="submit">Logout</button>
            </form>
        </div>
    )
}

export default LoginForm