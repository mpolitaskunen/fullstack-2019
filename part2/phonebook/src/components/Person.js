import React from 'react'

// Let's create the person display with the button...
const Person = ({ name, number, removeEntry }) => (
    <li>
    {name} {number} <button onClick={removeEntry}>Remove</button>
    </li>
    )

export default Person