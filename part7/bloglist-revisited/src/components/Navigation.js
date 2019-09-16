// Imported external libraries here
import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router , Link } from 'react-router-dom'

// Components here
import Authentication from './Authentication'

const Navigation = ({ user }) => {
    // Link style
    const padding = { padding: 5 }

    // The actual navigation bar
    const navigationBar = () => {
        return (
            <div>
                <Router>
                    <div>
                        <Link style={padding} to='/'>Home</Link>
                        <Link style={padding} to='/users'>Users</Link>
                        <Authentication className='login' />
                    </div>

                </Router>
            </div>
        )
    }

    return (
        <div>
            {navigationBar()}
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, null)(Navigation)