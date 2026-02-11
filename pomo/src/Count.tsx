import { useState, useEffect } from 'react'
import './App.css'
import './count.css'

interface CountProps {
  timer: number
}

function Count({ timer }: CountProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (timer === 0) {
      setCount(prevCount => prevCount + 1)
    }
  }, [timer])

  return <div className='count-container'>Laps : {count}</div>
}

export default Count