// Imported external libraries here
import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router , Route, Link, Redirect, withRouter } from 'react-router-dom'

// Components here
import User from './User'
import Users from './Users'
import Home from './Home'
import BlogPage from './BlogPage'

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
                    </div>
                    <Route exact path='/' render={() =>
                        user ? <Home /> : <div /> } />
                    <Route exact path='/users' render={() =>
                        user ? <Users /> : <div /> } />
                    <Route exact path='/users/:id' render={({ match }) =>
                        <User id={match.params.id} />} />
                    <Route exact path='/blogs/:id' render={({ match }) =>
                        <BlogPage id={match.params.id} />} />
                </Router>
            </div>
        )
    }

    return (
        <div>
            {user
                ? navigationBar()
                : <div> </div>}
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, null)(Navigation)