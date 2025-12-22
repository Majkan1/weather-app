import {useState} from 'react';
import {useEffect} from 'react';
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
  useEffect(()=>{
    async function Data(){
    const cities = {
    Berlin: { lat: 52.52, lon: 13.41 },
    Warsaw: { lat: 52.23, lon: 21.01 },
    Minsk: { lat: 53.9, lon: 27.5667 },
    Tokyo: { lat: 35.68, lon: 139.76 },
    Paris: { lat: 48.85, lon: 2.35 }
    // Add more cities here
  };
      const { lat, lon } = cities[tekst]
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,rain,snowfall,cloud_cover_low`;
      const res = await fetch(url);
      const data = await res.json();
      setWeather(data);
    }
    Data();
  },[tekst])
    return (
    <>
      {weather && (
        <div className = "Div">
          <p>Timezone: {weather.timezone}</p>
          <p>Lat/Lon: {weather.latitude}, {weather.longitude}</p>
          <p>First temp: {weather?.hourly?.temperature_2m?.[0]}°C</p>
        </div>
      )}
    </>
  )
}