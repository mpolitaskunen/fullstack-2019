import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import Filter from './Filter'
import Persons from './Persons'
import Form from './Form'

const App = () => {
    // Let's create sample data...
    const [ persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]) 
    
    // Define some variables..
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter ] = useState(null)

    const addNumber = (event) => {
        // Let's prevent default event functionality...
        event.preventDefault()

        // And let's create a new number object with defined structure
        const numberObject = {
            name: newName,
            number: newNumber
        }

        // The Conditional to check if the name already exists...
        if(persons.some(person => person.name === newName)) {
            window.alert(`${newName} is already added to the phonebook`)
        } else {
            // Add the new number object into the persons array
            setPersons(persons.concat(numberObject))

            // And reset the newName variable
            setNewName('')
        }
    }

    const handleNameChange = (event) => {
        // Let's set the newName variable as the text comes in...
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        // Let's set the newNumber variable as the text comes in...
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        // Let's update the newFilter variable with lowercase data
        setNewFilter(event.target.value.toLowerCase());
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <Filter handleFilterChange={handleFilterChange} />
            <h3>Add a new entry</h3>
            <Form submit={addNumber} names={handleNameChange} numbers={handleNumberChange} />
            <h3>Numbers</h3>
            <Persons persons={persons} filter={newFilter} />
        </div>
    )
}

export default App