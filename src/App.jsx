import './App.css'
import {Routes,Route,Link} from "react-router-dom";
export default function App() {
  return (
      <>
        <Header/>
      </>
  )
}

function Header(){
  return (
    <>
    <header className = "header">
      <nav>
        <Link  className = "Home"to = "/">Home</Link>
        <Link className = "About"to ="/about">About</Link>
      </nav>
    </header>
      <Routes>
        <Route path = "/" element = {<Main/>}/>
        <Route path = "/about" element = {<About/>}/>
      </Routes>
    </>
  )
}

function Main(){
  return (
    <div>
      <input type = "text" placeholder = "Write here the town you want to see a weather"/>
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