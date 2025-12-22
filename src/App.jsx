import {useState} from 'react';
import {useEffect} from 'react';
import { Link } from 'react-router-dom';
import './App.css'
export default function App() {
  return (
      <>
        <Main/>
        <Nav/>
        <Picture/>
      </>
  )
}

function Main(){
  const [tekst,setTekst] = useState("");

  const array = [
    'Warsaw','Minsk',
    'Belarus','Poland',
    'Berlin','Germany'
  ];

  const array1 = array.filter(item => item.toLowerCase().startsWith(tekst.toLowerCase()));
  return (
    <div>
      <div className="main">
        <input type = "text" value = {tekst} placeholder = "Write here the town you want to see a weather" onChange = {(e)=>setTekst(e.target.value)}/>
        <ul>
          {tekst && array1.map((item,index)=>(
            <li onClick = {()=> setTekst(item)} key = {index} style = {{cursor:'pointer'}}>{item}</li>))}
        </ul>  
      </div>
      <button>Search location</button>
    </div>
  )
}

function Nav(){
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  )
}

function Picture(){
  const [weather,setWeather] = useState(null);
  useEffect(()=>{
    async function Data(){
      const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&timezone=Europe%2FBerlin');
      const data = await res.json();
      setWeather(data);
    }
    Data();
  },[])
    return (
    <>
      {weather && 
        weather
      }
    </>
  )
}