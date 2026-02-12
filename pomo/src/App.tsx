import { useState } from 'react'
import Timer from './Timer.tsx'
import Count from './Count.tsx'
import Friend from './Friend.tsx'
import './css/App.css'
import Feed from './Feed.tsx'

function App() {
  const [timer, setTimer] = useState(5)
  const [isTimerActive, setIsTimerActive] = useState(false)
  const [count, setCount] = useState(0)
  const [justFed, setJustFed] = useState(false)

  return (
    <>
      {/* header */}
      <div className="navbar">
        <div className="app-header">
          <h1>pomodachi (:-:)::</h1>
        </div>
        <div className="app-header-divider">
        </div>
      </div>

      {/* main body */}
      <div className='wrapper'>
        <Timer 
          timer={timer}
          setTimer={setTimer}
          isTimerActive={isTimerActive}
          setIsTimerActive={setIsTimerActive}
        />
        <Count timer={timer} count={count} setCount={setCount} />
        <Feed count={count} setCount={setCount} setJustFed={setJustFed} />
        <Friend count={count} justFed={justFed} />
      </div>

      <div className="footer">
        <a href='https://jra.onl/' target='_'>jra.onl</a> |c| john gascoigne 2026
      </div>
    </>
  )
}

export default App