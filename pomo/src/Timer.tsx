import { useState, useEffect } from 'react'
import './css/App.css'
import './css/Timer.css'

function tick(setTimer: (timer: number) => void, timer: number) {
    setTimeout(() => {
        setTimer(timer - 0.1)
    }, 100)
}

interface TimerProps {
  timer: number
  setTimer: (timer: number) => void
  isTimerActive: boolean
  setIsTimerActive: (active: boolean) => void
}

type Status = 'Focus' | 'Break' | 'Long Break'

function Timer({ timer, setTimer, isTimerActive, setIsTimerActive }: TimerProps) {
    const [status, setStatus] = useState<Status>('Focus');
    
    if (isTimerActive && timer > 0) {
        tick(setTimer, timer);
    }

    useEffect(() => {
        if (timer <= 0) {
            if (status === 'Focus') {
                setStatus('Break');
                setTimer(60 * 0.05);
            } else if (status === 'Break') {
                setStatus('Focus');
                setTimer(60 * 25);
            } else if (status === 'Long Break') {
                setStatus('Focus');
                setTimer(60 * 15);
            }

            setIsTimerActive(false);
        }
    }, [timer, status, setTimer, setIsTimerActive]);

    const minutes = Math.floor((timer % 3600) / 60);
    const seconds = Math.floor(timer % 60);
    
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toFixed(0).padStart(2, '0')}`;
    document.title = `${formattedTime} - (:-:)::`;

    return (
        <div className="timer-container">
            <button onClick={() => setIsTimerActive(!isTimerActive)}>
                {isTimerActive ? `Pause ${status}` : `Resume ${status}`}
            </button>
            <h1>{formattedTime}</h1>
        </div>
    )
}

export default Timer