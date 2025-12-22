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
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(()=>{
    const controller = new AbortController();

    async function Data(){
      const q = (tekst ?? '').trim();
      if (!q) {
        setWeather(null);
        setStatus('idle');
        setError(null);
        return;
      }

      const apiKey = import.meta.env.VITE_OWM_API_KEY;
      if (!apiKey) {
        setWeather(null);
        setStatus('error');
        setError('Missing API key. Set VITE_OWM_API_KEY in .env.local');
        return;
      }

      setStatus('loading');
      setError(null);
      setWeather(null);

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(q)}&appid=${encodeURIComponent(apiKey)}&units=metric&lang=pl`;
      const res = await fetch(url, { signal: controller.signal });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const msg = data?.message ? String(data.message) : `HTTP ${res.status}`;
        throw new Error(msg);
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
          <p>City: {weather?.name}</p>
          <p>Temp: {weather?.main?.temp}°C</p>
          <p>Wind speed: {weather?.wind?.speed} m/s</p>
          <p>Rain (1h): {weather?.rain?.['1h'] ?? 0} mm</p>
        </div>
      )}
    </>
  )
}