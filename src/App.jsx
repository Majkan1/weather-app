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
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${tekst}&appid=${"3d10548a69b829b4b04166f7a0daa4c4"}`;
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