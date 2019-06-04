import React from 'react'


const Filter = ({ filterCriteria, filterListener }) => {
    return(
      <div>
        <form>
          <div>
              Find countries: <input value={filterCriteria} onChange={filterListener} />
          </div>
        </form>
      </div>
    )
  }

export default Filter