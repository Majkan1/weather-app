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
          <p>{weather}</p>
        </div>
      )}
    </>
  )
}