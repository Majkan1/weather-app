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

  useEffect(()=>{
    async function Data(){
      try {
        const url = `https://wttr.in/${encodeURIComponent(tekst)}?format=j1&lang=pl`;
        const res = await fetch(url);
        const data = await res.json();
        setWeather(data);
      } catch {
        setWeather(null);
      }
    }
    Data();
  },[tekst])
    return (
    <>
      {weather && (
        <div className = "Div">
          <p>
            City: {weather.nearest_area && weather.nearest_area[0] && weather.nearest_area[0].areaName && weather.nearest_area[0].areaName[0] ? weather.nearest_area[0].areaName[0].value : ''}
            {weather.nearest_area && weather.nearest_area[0] && weather.nearest_area[0].region && weather.nearest_area[0].region[0] ? `, ${weather.nearest_area[0].region[0].value}` : ''}
            {weather.nearest_area && weather.nearest_area[0] && weather.nearest_area[0].country && weather.nearest_area[0].country[0] ? `, ${weather.nearest_area[0].country[0].value}` : ''}
          </p>
          <p>Temp: {weather.current_condition && weather.current_condition[0] ? weather.current_condition[0].temp_C : ''}°C</p>
          <p>Wind speed: {weather.current_condition && weather.current_condition[0] ? weather.current_condition[0].windspeedKmph : ''} km/h</p>
          <p>Precipitation: {weather.current_condition && weather.current_condition[0] ? weather.current_condition[0].precipMM : ''} mm</p>
          <p>Weather: {weather.current_condition && weather.current_condition[0] && weather.current_condition[0].weatherDesc && weather.current_condition[0].weatherDesc[0] ? weather.current_condition[0].weatherDesc[0].value : ''}</p>
        </div>
      )}
    </>
  )
}