import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'

const AnecdoteList = ({ anecdotes }) => (
    <div>
        <h2>Anecdotes</h2>
        <ul>
            {anecdotes.map(anecdote => 
                <li key={anecdote.id} >
                    <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
                </li>
            )}
        </ul>
    </div>
)

const About = () => (
    <div>
        <h2>About anecdote app</h2>
        <p>According to Wikipedia:</p>

        <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </div>
)

const Anecdote =({ anecdote }) => (
    <div>
        <h2>{anecdote.content} by {anecdote.author}</h2>
        <div>has {anecdote.votes} votes</div><br/>
        <div>For more information, see: <a href={anecdote.info}>{anecdote.info}</a></div><br/>
    </div>
)

const Footer = () => (
    <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
    </div>
)

const CreateNew = (props) => {
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [info, setInfo] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content,
            author,
            info,
            votes: 0
        })
        props.history.push('/')
        props.notifyUser(`A new Anecdote "${content}" created!`, 10)
    }


    return (
        <div>
            <h2>Create a new Anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    Content: <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div>
                    Author: <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div>
                    URL for more info: <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
                </div>
                <button>Create</button>
            </form>
        </div>
    )
}

const Create = withRouter(CreateNew)

const App = () => {
    const padding = {
        paddingRight: 5
    }

    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: '1'
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: '2'
        }
    ])

    const [notification, setNotification] = useState('')

    const notifyUser = (message, time) => {
        setNotification(message)
        setTimeout(() => {
            setNotification('')
        }, time * 1000)
    }

    const addNew = (anecdote) => {
        anecdote.id = (Math.random() * 10000).toFixed(0)
        setAnecdotes(anecdotes.concat(anecdote))
    }

    const anecdoteById = (id) =>
        anecdotes.find(a => a.id === id)

    const vote = (id) => {
        const anecdote = anecdoteById(id)

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1
        }

        setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    }

    return (
        <div>
            <h1>Software anecdotes</h1>
            <div>{notification}</div>
            <div>
            <Router>
                <div>
                    <Link to='/' style={padding}>Anecdotes</Link>
                    <Link to='/create' style={padding}>Create new</Link>
                    <Link to='/about' style={padding}>About</Link>
                </div>
                <Route exact path="/" render={() => <AnecdoteList anecdotes={anecdotes} />} />
                <Route exact path="/anecdotes/:id" render={(({ match }) => <Anecdote anecdote={anecdoteById(match.params.id)}/>)} />
                <Route path="/create" render={() => <Create addNew={addNew} notifyUser={notifyUser} />} />
                <Route path="/about" render={() => <About />} />
            </Router>
            </div>
            <Footer />
        </div>
    )
}

export default App