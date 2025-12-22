import {useState} from 'react';
import {BrowserRouter,Routers,Router,Link} from 'react=router-dom';
import './App.css'
export default function App() {
  return (
      <>
        <Main/>
        <AddButton/>
        <Route/>
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

  const array1 = array.filter(item => item.toLowerCase().includes(tekst.toLowerCase()));
  return (
    <div>
      <div className="main">
        <input type = "text" value = {tekst} placeholder = "Write here the town you want to see a weather" onChange = {(e)=>setTekst(e.target.value)}/>
        <ul>
          {tekst && array1.map((item,index)=>(
            <li onClick = {()=> setTekst(item)} key = {index} style = {{cursor:'pointer',color:'white'}}>{item}</li>))}
        </ul>
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

function Route(){
  return (
    <>
      <BrowserRouter>
      
        <nav>
          <Link to = "/">Home</Link>
        </nav>
      </BrowserRouter>
    </>
  )
}