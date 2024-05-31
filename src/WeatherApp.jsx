import { useState } from "react"

export const WeatherApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = '493c0b0d54d5b1b6328df4e0714dfd70'

    const [ciudad, setCiudad] = useState('');
    const [dataClima, setDataClima] = useState(null)

    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(ciudad.length > 0) fetchClima();
    }

    const fetchClima = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`);
            const data = await response.json();
            setDataClima(data);
        } catch(error) {
            console.error('Ocurrio el siguiente problema: ', error);
        }
    }

  return (
    <div className="container">
       <h1>Aplicacion del Clima</h1>

        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            value= { ciudad }
            onChange={ handleCambioCiudad }
            />
            <button type="submit">Buscar</button>
        </form>
        {
            dataClima &&  (
                <div>
                    <h2>{dataClima.name} {dataClima.sys.country}</h2>
                    <p><b>Temperatura: </b>{parseInt((dataClima.main.temp)-273.15)} °C</p>
                    <p><b>Temperatura MAX: </b>{parseInt((dataClima.main.temp_max)-273.15)} °C</p>
                    <p><b>Temperatura MIN:</b> {parseInt((dataClima.main.temp_min)-273.15)} °C</p>
                    <p><b>Descripcción: </b>{dataClima.weather[0].description}</p>
                    <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}/>
                </div>
            )
        }
    </div>
  )
}
