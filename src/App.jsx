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
  const [weather,setWeather] = useState(null);
  const [place, setPlace] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(()=>{
    const controller = new AbortController();

    async function Data(){
      const q = (tekst ?? '').trim();
      if (!q) {
        setWeather(null);
        setPlace(null);
        setStatus('idle');
        setError(null);
        return;
      }

      setStatus('loading');
      setError(null);
      setWeather(null);

      // 1) Geocode city name -> coordinates (no API key required)
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=1&language=pl&format=json`;
      const geoRes = await fetch(geoUrl, { signal: controller.signal });
      const geoData = await geoRes.json().catch(() => null);

      if (!geoRes.ok) {
        throw new Error(`Geocoding failed (HTTP ${geoRes.status})`);
      }

      const first = geoData?.results?.[0];
      if (!first) {
        throw new Error('City not found');
      }

      const lat = first.latitude;
      const lon = first.longitude;
      setPlace({
        name: first.name,
        country: first.country,
        admin1: first.admin1,
        latitude: lat,
        longitude: lon,
      });

      // 2) Fetch current weather for coordinates
      const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lon)}&current=temperature_2m,wind_speed_10m,precipitation,weather_code&timezone=auto`;
      const res = await fetch(forecastUrl, { signal: controller.signal });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(`Weather fetch failed (HTTP ${res.status})`);
      }

      if (!data?.current) {
        throw new Error('Weather data missing');
      }

      setWeather(data);
      setStatus('success');
    }

    Data().catch((e) => {
      if (e?.name === 'AbortError') return;
      setStatus('error');
      setError(e?.message ? e.message : String(e));
    });

    return () => controller.abort();
  },[tekst])
    return (
    <>
      {status === 'loading' && <p>Loading weather...</p>}

      {status === 'error' && (
        <div className="Div">
          <p style={{ wordBreak: 'break-word' }}>{error}</p>
        </div>
      )}

      {weather && (
        <div className = "Div">
          <p>
            City: {place?.name}
            {place?.admin1 ? `, ${place.admin1}` : ''}
            {place?.country ? `, ${place.country}` : ''}
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