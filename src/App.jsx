import './App.css'
export default function App() {
  return (
      <>
        <AddButton/>
        <Main/>
        <About/>
      </>
  )
}

function Main(){
  return (
    <div className="main">
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

function AddButton(){
    return (
      <>
        <buton>Search location</buton>
      </>
    )
}