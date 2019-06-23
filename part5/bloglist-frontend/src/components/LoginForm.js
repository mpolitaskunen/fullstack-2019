import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit, handleUsernameChange, handlePasswordChange, username, password }) => {
    // Let's define mandatory props...
    LoginForm.propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        username: PropTypes.object.isRequired,
        password: PropTypes.object.isRequired
    }

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    Username:
                    <input {...username} />
                </div>
                <div>
                    Password:
                    <input {...password} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm