import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit, handleUsernameChange, handlePasswordChange, username, password }) => {
    // Let's define mandatory props...
    LoginForm.propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        handleUsernameChange: PropTypes.func.isRequired,
        handlePasswordChange: PropTypes.func.isRequired,
        username: PropTypes.func.isRequired,
        password: PropTypes.func.isRequired
    }

    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    Username:
                    <input type="username" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm