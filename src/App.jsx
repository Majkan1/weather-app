import {useState} from 'react';
import './App.css'
export default function App() {
  return (
      <>
        <Main/>
        <AddButton/>
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

  const array1 =  array.filter(item => item.includes(tekst));
  return (
    <div>
      <div className="main">
        <input type = "text" value = {tekst} placeholder = "Write here the town you want to see a weather" onChange = {(e)=>setTekst(e.target.value)}/>
      </div>
      <ul>
        {array1.map((index,item)=>(
          <li key = {index}>{item}</li>))}
      </ul>
      <button>Search location</button>
    </div>
  )
}


function AddButton(){
    return (
      <>
      </>
    )
}