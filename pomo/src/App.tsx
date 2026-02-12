import { useState } from 'react'
import Friend from './Friend.tsx'
import './css/App.css'
import Feed from './Feed.tsx'
import MyTimer from './Timer.tsx'

function App() {
  const [count, setCount] = useState(0)
  const [justFed, setJustFed] = useState(false)
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 5);

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
        <MyTimer 
          expiryTimestamp={expiryTimestamp}
        />
        {/* <Count timer={timer} count={count} setCount={setCount} /> */}
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