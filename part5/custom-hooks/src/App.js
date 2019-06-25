import React, { useEffect } from 'react'
import { useResource, useField } from './hooks'

const App = () => {
    const content = useField('text')
    const name = useField('text')
    const number = useField('text')

    const [notes, noteService] = useResource('http://localhost:3005/api/notes')
    const [persons, personService] = useResource('http://localhost:3005/api/persons')

    const handleNoteSubmit = (event) => {
        event.preventDefault()
        noteService.create({ content: content.value })
    }
  
    const handlePersonSubmit = (event) => {
        event.preventDefault()
        personService.create({ name: name.value, number: number.value})
    }

    const updatePersons = async () => {
        personService.getAll()
    }

    const updateNotes = async () => {
        noteService.getAll()
    }

    useEffect(() => {
        updateNotes()
        updatePersons()
    // eslint-disable-next-line
    }, [])

    return (
        <div>
            <h2>Notes</h2>
            <form onSubmit={handleNoteSubmit}>
                <input {...content} />
                <button>create</button>
            </form>
            {notes.map(n => <p key={n.id}>{n.content}</p>)}

            <h2>persons</h2>
            <form onSubmit={handlePersonSubmit}>
                name <input {...name} /> <br/>
                number <input {...number} />
                <button>create</button>
            </form>
            {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
        </div>
    )
}

export default App