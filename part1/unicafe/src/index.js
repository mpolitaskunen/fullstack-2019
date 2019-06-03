import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    )
}

const Nappula = (props) => {
    console.log(props)
    const { handleClick, text} = props
    return( 
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const Statistic = (props) => {
    return (
        <tr>
            <td>{props.text}</td><td>{props.value}</td>
        </tr>
    )
}

const Statistics = (props) => {
    console.log(props)

    const total = props.a + props.b + props.c

    if(total == 0) {
        return (
            <div>
                <Header title='Statistics' />
                <p>No feedback given</p>
            </div>
        )
    }
    
    return(
        <div>
            <Header title='Statistics' />
            <table>
                <tbody>
                    <Statistic text='Good' value={props.a} />
                    <Statistic text='Neutral' value={props.b} />
                    <Statistic text='Bad' value={props.c} />
                    <Statistic text='All' value={total} />
                    <Statistic text='Average' value={props.d / total} />
                    <Statistic text='Positive %' value={(props.a / total)*100}/>
                </tbody>
            </table>
        </div>
    )
}

const App = () => {
    // Let's define constants
    const appSettings = {
        name: 'Feedback Page'
    }
  
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [allVotes, setAll] = useState(0)

    const addGood = () => {
        setGood(good + 1)
        setAll(allVotes + 1)
    }

    const addNeutral = () => {
        setNeutral(neutral + 1)
        setAll(allVotes + 0)
    }

    const addBad = () => {
        setBad(bad + 1)
        setAll(allVotes - 1)
    }




    return (
        <div>
            <Header title={appSettings.name} />
            <Nappula handleClick={addGood} text='Good' />
            <Nappula handleClick={addNeutral} text='Neutral' />
            <Nappula handleClick={addBad} text='Bad' />
            <Statistics a={good} b={neutral} c={bad} d={allVotes} />
        </div>
    ) 
}

ReactDOM.render(
    <App />, document.getElementById('root')
)