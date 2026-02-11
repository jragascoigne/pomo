import { useState } from 'react'
import Timer from './Timer.tsx'
import Count from './Count.tsx'
import './App.css'

function App() {
  const [timer, setTimer] = useState(5)
  const [isTimerActive, setIsTimerActive] = useState(false)

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
        <Timer 
          timer={timer}
          setTimer={setTimer}
          isTimerActive={isTimerActive}
          setIsTimerActive={setIsTimerActive}
        />
        <Count timer={timer} />
      </div>
    </>
  )
}

export default App