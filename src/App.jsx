import { useEffect, useState } from 'react';
import './App.css'
export default function App() {
  const [tekst,setTekst] = useState("");
  return (
      <>
        <Main tekst= {tekst} setTekst = {setTekst}/>
        <Picture tekst = {tekst}/>
      </>
  )
}

function Main({tekst,setTekst}){

  const array1 = tekst ? [tekst] : [];
  return (
    <div className="main">
      <input type = "text" value = {tekst} placeholder = "Write here the town you want to see a weather" onChange = {(e)=>setTekst(e.target.value)}/>
      <ul>
        {tekst && array1.map((item,index)=>(
          <li onClick = {()=> setTekst(item)} key = {index} style = {{cursor:'pointer'}}>{item}</li>))}
      </ul>  
    </div>
  )
}

function Picture({tekst}){
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    async function Data() {

      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(tekst)}&count=1&language=pl&format=json`;
      const geoRes = await fetch(geoUrl);
      const geoData = await geoRes.json();

      const lat = geoData?.results?.[0]?.latitude;
      const lon = geoData?.results?.[0]?.longitude;
      const name = geoData?.results?.[0]?.name;
      const admin1 = geoData?.results?.[0]?.admin1;
      const country = geoData?.results?.[0]?.country;
      if (lat == null || lon == null) {
        setWeather(null);
        return;
      }

      const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,precipitation,weather_code&timezone=auto`;
      const res = await fetch(forecastUrl);
      const data = await res.json();

      setWeather({
        placeName: name,
        admin1,
        country,
        ...data,
      });
    }
      Data();
    },[tekst]);

  return (
    <>
      {weather && (
        <div className="Div">
          <p>
            City: {weather?.placeName}
            {weather?.admin1 ? `, ${weather.admin1}` : ''}
            {weather?.country ? `, ${weather.country}` : ''}
          </p>
          <p>
            Temp: {weather?.current?.temperature_2m}{weather?.current_units?.temperature_2m}
          </p>
          <p>
            Wind speed: {weather?.current?.wind_speed_10m}{weather?.current_units?.wind_speed_10m}
          </p>
          <p>
            Precipitation: {weather?.current?.precipitation}{weather?.current_units?.precipitation}
          </p>
          <p>Weather code: {weather?.current?.weather_code}</p>
        </div>
      )}
    </>
  )
}