import React from 'react'
import Country from './Country'

const Formatting = ({ countries,buttonHandler,filter }) => {
    // Let's create a copy of the countries..
    let matches = countries

    // If there is a filter in place, let's filter the copied array...
    if ( filter ) {
        matches = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    }
    
    // Now here's the main IF-loop, if the matches array size is over 10, then
    // Return a message, if it's over 1, but under 11, return a buttoned list,
    // And finally, if there's only one option, return that one.
    // And of course, if any of the above mentioned conditions are not fulfilled,
    // return 'no matches found'

    if(matches.length > 10){
      return(
        <div>
          <h3>Too many matches, specify another filter</h3>
        </div>
      )
    } else if (matches.length > 1 ) {
      return(
        <div>
            {matches.map(country => 
                <li key={country.name}>{country.name} <button onClick={buttonHandler} country={country.name}>Show</button></li>
            )}
        </div>
      )
    } else if (matches.length === 1) {
      return(
        <div>
          <Country country={matches[0]} />
        </div>
      )
    } else {
      return(
        <div>
          <h3>No matches found.</h3>
        </div>
      )
    }    
}

export default Formatting