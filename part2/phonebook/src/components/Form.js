import React from 'react'

const Form = ({ submit,names,numbers }) => {
    return (
        <div>
            <form onSubmit={submit}>
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" name="name" onChange={names} required /> <br/>
                <label htmlFor="number">Number:</label> 
                <input type="tel" id="number" name="number" onChange={numbers} required />
                <button type="submit">add</button>
            </form>
        </div>
    )
}


export default Form