import React, { useState, useEffect } from 'react'

import Filter from './Filter'
import Persons from './Persons'
import Form from './Form'
import comms from './Backendcomms'
import Notification from './Notification'

const App = () => {
    // Let's define the array...
    const [ persons, setPersons] = useState([])

    // Define some state variables..
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter ] = useState(null)

    // Let's define notification stuff...
    const [ notificationState, setNotificationState ] = useState({
        message: null,
        type: null
    })

    // Let's read the data from the database into persons array...
    useEffect(() => {
        comms
            .getAll()
            .then(entries => {
                setPersons(entries)
            })
    }, [])

    const addNumber = (event) => {
        // Let's prevent default event functionality...
        event.preventDefault()

        // And let's create a new number object with defined structure
        const numberObject = {
            name: newName,
            number: newNumber,
        }

        // The Conditional to check if the name already exists...
        if(persons.find(person => person.name === newName)) {
            // And if we want to replace the old entry if it exists..
            if(window.confirm(`${newName} is already in the phonebook, do you want to update?`)) {
                const id = persons.find(entry => entry.name === newName).id
                // Let's update the database...
                comms
                    .update(id,numberObject)
                    .then(newEntry => {
                        const newState = {
                            message: `The entry for ${numberObject.name} has been updated`,
                            type: 'note'
                        }
                        setNotificationState(newState)
                        setTimeout(() => { setNotificationState({ ...notificationState, message: null })
                        }, 5000)

                        // And let's update the view
                        const newPersons = persons.map(person => person.id !== id ? person : newEntry)
                        setPersons(newPersons)
                    })
                    // Let's catch errors!
                    .catch(error => {
                        const newState = {
                            message: `The entry of ${numberObject.name} has already been removed from the server`,
                            type: 'error'
                        }
                        setNotificationState(newState)
                        setTimeout(() => { setNotificationState({ ...notificationState, message: null })
                        }, 5000)

                        setPersons(persons.filter(person => person.id !== id))
                    })
            }

        } else {
            comms
                .create(numberObject)
                .then(newEntry => {
                    const newState = {
                        message: `Added ${newEntry.name}`,
                        type: 'note'
                    }
                    setNotificationState(newState)
                    setTimeout(() => { setNotificationState({ ...notificationState, message: null })
                    }, 5000)

                    setPersons(persons.concat(numberObject))
                    setNewName('')
                    setNewNumber('')
                })
                .catch(error => {
                    const newState = {
                        message: 'Validation error: Either name was shorter than 3 characters or number was shorter than 8 characters',
                        type: 'error'
                    }
                    setNotificationState(newState)
                    setTimeout(() => { setNotificationState({ ...notificationState, message: null })
                    }, 5000)
                })
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
        setNewFilter(event.target.value.toLowerCase())
    }

    const removeEntryHandler = (id) => {
        // Let's define the entry for removal...
        const entry = persons.find(person => person.id === id)

        // And let's confirm that we're removing the entry
        if(window.confirm(`Are you sure you want to remove ${entry.name}?`)) {
            // Remove from server...
            comms
                .removeEntry(id)
                // Let's notify about the removal..
                .then(response => {
                    const newState = {
                        message: `Removed ${entry.name}`,
                        type: 'note'
                    }
                    setNotificationState(newState)
                    setTimeout(() => {
                        setNotificationState({ ...notificationState, message:null })
                    }, 5000)

                    // Let's remove the entry form view too..
                    setPersons(persons.filter(entry => entry.id !== id))
                })
                // Let's catch errors!
                .catch(error => {
                    const newState = {
                        message: `The entry of ${entry.name} has already been removed from the database.`,
                        type: 'error'
                    }
                    setNotificationState(newState)
                    setTimeout(() => { setNotificationState({ ...notificationState, message:null })
                    }, 5000)

                    // Let's clean up the view, since the entry doesn't exist anyways...
                    setPersons(persons.filter(person => person.id !== id))
                })
        }
    }

    return (
        <div>
            <Notification state={notificationState} />
            <h1>Phonebook</h1>
            <Filter handleFilterChange={handleFilterChange} />
            <h3>Add a new entry</h3>
            <Form submit={addNumber} names={handleNameChange} numbers={handleNumberChange} />
            <h3>Numbers</h3>
            <Persons persons={persons} filter={newFilter} removeEntry={removeEntryHandler} />
        </div>
    )
}

export default App