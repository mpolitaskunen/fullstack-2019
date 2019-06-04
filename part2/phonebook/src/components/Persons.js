import React from 'react'
import Person from './Person'

const Persons = ({ persons,filter,removeEntry }) => {
    // Let's make a clone of the array...
    let suodatin = [...persons]

    // Let's compare our filter value to the filter array names..
    if(filter){
        suodatin = suodatin.filter((person) => {
            return person.name.toLowerCase().includes(filter)
        })
    }

    // Let's display filtered list of persons with the Remove-button
    const rows = suodatin.map(person =>
        <Person key={person.name} name={person.name} number={person.number} removeEntry={() => removeEntry(person.id)} />
    )

    // And let's return the data
    return (
        <ul>
            {rows}
        </ul>
    )
}

export default Persons