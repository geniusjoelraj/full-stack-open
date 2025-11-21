import axios from 'axios'
import { useEffect, useState } from 'react'


function App() {
  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => {
        const countries = res.data.map((country: any) => country.name.common);
        setCountries(countries);
      })
  }, [])

  const getCountry = (query: string) => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${query}`)
      .then(res => {
        setCountry(res.data.name.official);
        setCapital(res.data.capital);
        setArea(res.data.area);
        setLanguages(Object.values(res.data.languages));
        setFlag(res.data.flags.png);
      })
  }
  const [searchQuery, setSearchQuery] = useState('');
  const [countries, setCountries] = useState<Array<string>>();
  const [country, setCountry] = useState<string>();
  const [capital, setCapital] = useState<string>();
  const [area, setArea] = useState<number>();
  const [languages, setLanguages] = useState<Array<string>>();
  const [flag, setFlag] = useState<string>();
  const handleChange = (val: any) => {
    setSearchQuery(val.target.value)
  }
  const filteredCountries = countries ? countries
    .filter(country =>
      country.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

  useEffect(() => {
    if (filteredCountries.length == 1) {
      getCountry(filteredCountries[0])
    }
    setCountry('')
  }, [searchQuery])

  return (
    <>
      <input type="text" value={searchQuery} onChange={handleChange} />
      {countries ?
        <ul>
          {filteredCountries.length <= 10 ?
            filteredCountries
              .map(filteredCountry => (
                <li key={filteredCountry}>{filteredCountry}</li>
              ))
            : null
          }
        </ul>
        : <p>Loading...</p>
      }
      {filteredCountries.length == 1 ?
        <>
          <h1>{country}</h1>
          <p>Capital: {capital}</p>
          <p>Area: {area}</p>
          <h1>Languages</h1>
          <ul>
            {languages?.map(lang => <li>{lang}</li>)}
          </ul>
          <img src={flag} alt="flag" />
        </>
        :
        null
      }
    </>
  )
}

export default App
