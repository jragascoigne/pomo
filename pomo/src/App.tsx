import { useState } from 'react'
import Timer from './Timer.tsx'
import './App.css'

function App() {

  return (
    <>
    <div className="navbar">
        <div className="app-header">
          <h1>pomodachi (:-:)::</h1>
        </div>
        <div className="app-header-divider">
        </div>
    </div>

      <div className='timer-wrapper'>
        <Timer />
      </div>
    </>
  )
}

export default App
