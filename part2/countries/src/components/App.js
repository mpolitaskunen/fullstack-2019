import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './Filter'
import Formatting from './Formatting'

function App() {
  // Let's define some variables...
  const [countries, setCountries] = useState([])
  const [filterCriteria, setFilterCriteria] = useState('')

  // Create the Listener for the filter field...
  const filterListener = (event) => {
    setFilterCriteria(event.target.value)
  }

  useEffect(() => {
    const query = axios.get('https://restcountries.eu/rest/v2/all')
    query.then(response => setCountries(response.data))
  })

  const displayButton = (event) => {
    setFilterCriteria(event.target.attributes.country.value)
  }

  return (
    <div>
      <h1>List of countries</h1>
      <Filter filterCriteria={filterCriteria} filterListener={filterListener} />
      <Formatting countries={countries} buttonHandler={displayButton} filter={filterCriteria}/>
    </div>
  );
}

export default App;
