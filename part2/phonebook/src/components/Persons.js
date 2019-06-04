import React from 'react'

const Persons = ({ persons,filter }) => {
    // Let's make a clone of the array...
    let suodatin = [...persons]

    // Let's compare our filter value to the filter array names..
    if(filter){
        suodatin = suodatin.filter((person) => {
            return person.name.toLowerCase().includes(filter)
        })
    }

    // Let's display filtered list of persons
    const rows = suodatin.map((person) => {
         return (<li key={person.name}>{person.name} {person.number} </li>)
    })

    // And let's return data to the App itself
    return (
        <ul>
            {rows}
        </ul>
    )
}

export default Persons