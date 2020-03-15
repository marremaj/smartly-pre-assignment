import React, { useState } from "react"
import "./App.css"

const App = () => {
  const [facts, setFacts] = useState([])
  const [fetching, setFetchingState] = useState(false)
  const [error, setError] = useState({ error: false, message: "" })

  const thingy = async () => {
    try {
        setFetchingState(true)
        const a = await fetch("/facts/random?amount=5", {
          headers: {
            "Content-Type": "application/json"
          }
        })
        if (a.status !== 200)
          throw Error("Error in fetching data")
        const b = await a.json()
        setFacts(b)
        console.log("SITUATION", b)
        setError({ error: false, message: "" })
        setFetchingState(false)
    } catch (e) {
      console.log(`${e}`)
      setError({ error: true, message: e.message})
      setFetchingState(false)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Marina's cat facts</h1>
      </header>
      <button onClick={thingy}>Reload facts</button>
      <br></br>
      {fetching ? (
        <i className="fa fa-paw fa-spin" />
      ) : error.error ? (
        <div className="error">{error.message}</div>
      ) : (
        facts.map((fact, i) => {
          return (
            <div className="fact-box" key={i}>
              <span className="index">{i+1}</span><br/>{fact.text}
            </div>
          )
        })
      )}
    </div>
  )
}

export default App
