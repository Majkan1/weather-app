import { useEffect, useMemo, useState } from 'react';
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
      <input type = "text" value = {tekst} placeholder = "Write here the town" onChange = {(e)=>setTekst(e.target.value)}/>
      <ul>
        {tekst && array1.map((item,index)=>(
          <li onClick = {()=> setTekst(item)} key = {index} style = {{cursor:'pointer'}}>{item}</li>))}
      </ul>  
    </div>
  )
}

function Picture({tekst}){
  const [weather, setWeather] = useState(null);

  const iconUrl = useMemo(() => {
  const icons = import.meta.glob('./assets/all/*.svg', { eager: true, query: '?url', import: 'default' });
  const pick = (n) => icons[`./assets/all/${n}`] || icons['./assets/all/not-available.svg'];
  return (w) => {
    const c = w?.current; if (!c) return pick('not-available.svg');
    if ((c.wind_speed_10m ?? 0) >= 40) return pick('wind.svg');
    const day = c.is_day === 1 || c.is_day === true, code = +c.weather_code;
    const n = code===0 ? (day?'clear-day.svg':'clear-night.svg')
      : code<=3 ? (day?'overcast-day.svg':'overcast-night.svg')
      : (code===45||code===48) ? (day?'fog-day.svg':'fog-night.svg')
      : (code>=51&&code<=67) ? 'rain.svg'
      : ((code>=71&&code<=77)||(code>=85&&code<=86)) ? 'snow.svg'
      : (code>=95&&code<=99) ? (day?'thunderstorms-day.svg':'thunderstorms-night.svg')
      : 'not-available.svg';
    return pick(n);
  };
}, []);

  useEffect(() => {
    async function Data() {

      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(tekst)}&count=1&language=en&format=json`;
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

      const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,precipitation,weather_code,is_day&timezone=auto`;
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
          <img className="weatherIcon" src={iconUrl(weather)} alt="weather" />
          <p>
            City: {weather?.placeName}
            {weather?.country ? `, ${weather.country}` : ''}
          </p>
          <div className='Both-parameters'>
            <div className = "temperature">
              <img src={new URL('./assets/all/thermometer.svg', import.meta.url).href} alt="temp" style={{width:'50px', height:'50px', marginRight:'5px'}} />
              {weather?.current?.temperature_2m}{weather?.current_units?.temperature_2m}
            </div>
            <div className='wind'>
              <img src={new URL('./assets/all/wind.svg', import.meta.url).href} alt="wind" style={{width:'50px', height:'50px', marginRight:'5px'}} />
              {weather?.current?.wind_speed_10m}{weather?.current_units?.wind_speed_10m}
            </div>
          </div>
        </div>
      )}
    </>
  )
}