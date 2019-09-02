import React from 'react'
import { connect } from 'react-redux'

import Authentication from './components/Authentication'
import Notification from './components/Notification'
import Navigation from './components/Navigation'

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
        <div>
            <h2>Bloglist</h2>
            <Notification />
            <Authentication className='login' />
            {user !== null
                ? <div><Navigation /></div>
                : <div />}
            <Footer/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(null, mapStateToProps)(App)