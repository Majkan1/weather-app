import {useState} from 'react';
import { Link } from 'react-router-dom';
import './App.css'
export default function App() {
  return (
      <>
        <Main/>
        <AddButton/>
        <Nav/>
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
        {tekst && (
        <ul>
          {array1.map((item,index)=>(
            <li onClick = {()=> setTekst(item)} key = {index} style = {{cursor:'pointer'}}>{item}</li>))}
        </ul>
          )}  
      </div>
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

function Nav(){
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  )
}