import './App.css'
import {Routes,Route,Link} from "react-router-dom";
export default function App() {
  return (
      <>
        <Main/>
      </>
  )
}

function Main(){
  return (
    <>
    <header className = "header">
      <img src = "logo\logo/logo.png" alt = "My logo"/>
      <nav>
        <Link to = "/">Home</Link>
        <Link to ="/about">About</Link>
      </nav>
    </header>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/about" element = {<About/>}/>
      </Routes>
    </>
  )
}

function Home(){
  return (
    <div>
      <h1>Pogoda — Strona główna</h1>
      <p>Tu zaczniesz budować widok pogody.</p>
    </div>
  )
}

function About(){
  return (
    <div>
      <h1>About</h1>
      <p>Prosty przykład nawigacji z react-router-dom.</p>
    </div>
  )
}