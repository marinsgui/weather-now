import { useState } from 'react'
import './App.css'

function App() {

  const [city, setCity] = useState('')
  const [weather, setWeather] = useState({})


  const handleSearch = (e) => {
    e.preventDefault()

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&lang=pt_br&units=metric&appid=d5bbec1f9469a4d00df8f6ac6e8adce1`)
    .then(resp => resp.json())
    .then(data => setWeather(data))
    .catch(err => console.log(err))

    setCity('')
  }

  
  return (
    <div className="App">
      <h1>Previsão do tempo</h1>
      <div className='container'>
        <form>
          <input
          type="text"
          placeholder='Digite aqui o nome da cidade'
          onChange={(e) => setCity(e.target.value)}
          value={city}
          />
          <button className='search-btn' onClick={handleSearch}>Pesquisar</button>
        </form>
        {Object.keys(weather).length !== 0 && (
          <div className='results'>
            <h2>{weather.name}</h2>
            <div className='infos'>
              <div className='temps'>
                <p>{weather.main.temp}°C</p>
                <p><small>min.</small> {weather.main.temp_min}°C</p>
                <p><small>max.</small> {weather.main.temp_max}°C</p>
              </div>
              <div className='description'>
                <p>{weather.weather[0].description}</p>
                <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="Weather icon" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
