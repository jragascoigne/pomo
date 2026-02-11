import { useState } from 'react'
import Timer from './Timer.tsx'
import Count from './Count.tsx'
import Friend from './Friend.tsx'
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

      <div className='wrapper'>
        <Timer 
          timer={timer}
          setTimer={setTimer}
          isTimerActive={isTimerActive}
          setIsTimerActive={setIsTimerActive}
        />
        <Count timer={timer} />
      <Friend />

      </div>

      <div className="footer">
        <a href='https://jra.onl/' target='_'>jra.onl</a> |c| john gascoigne 2026
      </div>
    </>
  )
}

export default App