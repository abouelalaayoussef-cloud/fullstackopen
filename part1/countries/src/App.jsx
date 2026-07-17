import { useState , useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => (
  <div>
    <h2>{country.name.common}</h2>
    <p>capital {country.capital}</p>
    <p>area {country.area}</p>
    <h3>languages:</h3>
    <ul>
      {Object.values(country.languages || {}).map(lang =>
      <li key={lang}>{lang}</li>)}
    </ul>
    <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
  </div>
)

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
      }, [])

  const countriesToShow = filter ? countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase())) : []

  const handleFilterChange = (e) => setFilter(e.target.value)

  const renderResults = () => {
    if(filter == '') return null

    if(countriesToShow.length > 10) {
      return <p>Too many matches, specify another filter</p>
    }

    if(countriesToShow.length === 1) {
      return <Country country={countriesToShow[0]} />
    }

    return (
      <ul>
        {countriesToShow.map(c =>
          <li key={c.cca3}>
            {c.name.common}
            <button onClick={() => setFilter(c.name.common)}>show</button>
          </li>
        )}
      </ul>
    )
  }

  return (
    <div>
      <h1>Country Search</h1>
      <div>
        find countries <input value={filter} onChange={handleFilterChange} />
      </div>
      {renderResults()}
    </div>
  )
}







export default App
