import React from "react"

const Filter = ( { handleFilterChange } ) => {
    return (
        <div>
            <label htmlFor="suodatin">Filter shown with: </label>
            <input type='text' id='suodatin' nimi='suodatin' onChange={handleFilterChange} />
        </div>
    )
}

export default Filter