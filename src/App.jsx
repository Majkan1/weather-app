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
      <nav>
        <Link to = "/">Home</Link>
        <Link to ="/about">About</Link>
      </nav>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/" element = {<About/>}/>
      </Routes>
    </>
  )
}