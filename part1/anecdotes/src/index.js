import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

const votes = new Array(anecdotes.length).fill(0)

const Selector = () => {
    // Let's calculate the maximum value... Which is the length of array - 1 (since array starts at 0)
    const maximum = anecdotes.length - 1

    // Let's generate a random number and multiply it with the maximum value
    const guess = Math.random() * maximum
    
    // And finally, let's return the value as an integer
    return Math.floor(guess)
}

const MostVotes = () => {
    // Let's create a variable max and set it to votes arrays first value
    let max = votes[0];

    // Let's create a 0 index value
    let indeksi = 0;

    // For-loop for finding the maximum value inside the votes array
    for(let i = 1; i < votes.length; i++) {
        if(votes[i] > max) {
            indeksi = i;
            max = votes[i];
        }
    }
    
    return (
        <div>
            {anecdotes[indeksi]} <br/>
            has {votes[indeksi]} votes <br/>
        </div>
    )
}

const Button = ({ handleClick, text }) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)

    const voteSelected = () => {
        votes[selected] += 1
    }

    const randSelected = () => {
        setSelected(Selector)
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            {props.anecdotes[selected]} <br/>
            has {votes[selected]} votes <br/>
            <Button handleClick={voteSelected} text='Vote' />
            <Button handleClick={randSelected} text='Next anecdote' />
            <h1>Anecdote with most votes</h1>
            <MostVotes />
        </div>
    )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)