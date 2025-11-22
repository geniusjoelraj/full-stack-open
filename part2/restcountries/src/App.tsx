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
  const apiKey = import.meta.env.VITE_API_KEY;

  const getCountry = (query: string) => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${query}`)
      .then(res => {
        setCountry(res.data.name.common);
        setCapital(res.data.capital);
        setArea(res.data.area);
        setLanguages(Object.values(res.data.languages));
        setFlag(res.data.flags.png);
        getWeather(res.data.latlng);
      })
  }
  const [searchQuery, setSearchQuery] = useState('');
  const [countries, setCountries] = useState<Array<string>>();
  const [country, setCountry] = useState<string>();
  const [capital, setCapital] = useState<string>();
  const [area, setArea] = useState<number>();
  const [languages, setLanguages] = useState<Array<string>>();
  const [flag, setFlag] = useState<string>();
  const [temp, setTemp] = useState<string>();
  const [imgUrl, setImgUrl] = useState<string>()
  const [wind, setWind] = useState<number>();
  const handleChange = (val: any) => {
    setSearchQuery(val.target.value)
  }
  const filteredCountries = countries ? countries
    .filter(country =>
      country.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];
  const getWeather = (latlong: Array<number>) => {
    if (latlong) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latlong[0]}&lon=${latlong[1]}&appid=${apiKey}`)
        .then((res => res.data))
        .then(data => {
          setTemp((data.main.temp - 273).toFixed(2).toString() + "°C")
          setImgUrl(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
          setWind(data.wind.speed);
        });

    }
  }

  useEffect(() => {
    if (filteredCountries.length == 1) {
      getCountry(filteredCountries[0]);
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
                <li key={filteredCountry}>
                  {filteredCountry}
                  <button onClick={() => getCountry(filteredCountry)}>show</button>
                </li>
              ))
            : null
          }
        </ul>
        : <p>Loading...</p>
      }
      {filteredCountries ?
        <>
          <h1>{country}</h1>
          <p>Capital: {capital}</p>
          <p>Area: {area}</p>
          <h1>Languages</h1>
          <ul>
            {languages?.map(lang => <li>{lang}</li>)}
          </ul>
          <img src={flag} alt="flag" />
          <h1>Weather in {country}</h1>
          <p>Temperature: {temp}</p>
          <img src={imgUrl} alt={imgUrl} />
          <p>Wind: {wind} meter/sec</p>
        </>
        :
        null
      }
    </>
  )
}

export default App
