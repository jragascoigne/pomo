import { useEffect } from 'react'
import './App.css'

interface CountProps {
  timer: number
  count: number
  setCount: (count: number) => void
}

function Count({ timer, count, setCount }: CountProps) {
  useEffect(() => {
    if (timer <= 0) {
      setCount(count + 1)
    }
  }, [timer, count, setCount])

}

export default Count