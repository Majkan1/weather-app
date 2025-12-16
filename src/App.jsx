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
  return (
    <div className="main">
      <input type = "text" placeholder = "Write here the town you want to see a weather"/>
    </div>
  )
}


function AddButton(){
    return (
      <>
        <button>Search location</button>
      </>
    )
}