// Externaal Imports here
import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Component imports here
import Notification from './components/Notification'
import Navigation from './components/Navigation'
import Home from './components/Home'
import Users from './components/Users'
import User from './components/User'
import BlogPage from './components/BlogPage'

const App = ({ user }) => {
    // Define the Footer for the page (probably going to move this somewhere else...)
    const Footer = () => {
        const footerStyle = {
            color: 'black',
            fontStyle: 'bold',
            fontSize: 14
        }

        return (
            <div style={footerStyle}>
                <br />
                <em>Bloglist app - S. Taskunen 2019</em>
            </div>
        )
    }

    return (
        <div className='container'>
            <Router>
                <div className='navigationalBar'>
                    <Navigation />
                </div>
                <h2>Bloglist</h2>
                <Notification />
                <Route exact path='/' render={() =>
                    user ? <Home /> : <div /> } />
                <Route exact path='/users' render={() =>
                    user ? <Users /> : <div /> } />
                <Route exact path='/users/:id' render={({ match }) =>
                    <User id={match.params.id} />} />
                <Route exact path='/blogs/:id' render={({ match }) =>
                    <BlogPage id={match.params.id} />} />

                <Footer/>
            </Router>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, null)(App)