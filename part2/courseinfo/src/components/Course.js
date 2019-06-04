import React from 'react'

const Header = ({ name }) => {
    
    return(
    <div>
        <h1>{name}</h1>
    </div>
    )
}

const Part = ({ name, exercises }) => {
    return (
        <p>
            {name} {exercises}
        </p>
    )
}

const Content = ({ parts }) => {    
    const rows = () => 
        parts.map(part => <li key={part.id}><Part name={part.name} exercises={part.exercises}/></li>)
    
    return (
    <div>
        <ul>
            {rows()}
        </ul>
    </div>
    )
}

const Total = ({ parts }) => {
    const sum = parts.map(parts => parts.exercises).reduce((initial, current) => initial + current) 

    return (
        <div>
            <b>
                Total of {sum} exercises
            </b>
        </div>
    )
}

const Course = ({ courses }) => {
    const kurssit =
        courses.map((course) => 
            <div key={course.name}>
                <Header name={course.name} />
                <Content parts={course.parts} />
                <Total parts={course.parts} />
            </div>
        )

    return (
        <div>
            {kurssit}
        </div>

    )
}

export default Course