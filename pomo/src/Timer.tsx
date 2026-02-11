import { use, useState } from 'react'
import './App.css'
import './timer.css'

function tick(setTimer: (timer: number) => void, timer: number) {
    setTimeout(() => {
        setTimer(timer - 1)
    }, 1000)
}

function Timer() {
    const [timer, setTimer] = useState(600);
    const [isTimerActive, setIsTimerActive] = useState(false);

    if (isTimerActive && timer > 0) {
        tick(setTimer, timer);
    }

    const hours = Math.floor(timer / 3600);
    const minutes = Math.floor((timer % 3600) / 60);
    const seconds = timer % 60;
    
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return (
        <>
            <div className="timer-container">
                <button onClick={() => setIsTimerActive(!isTimerActive)}>{isTimerActive ? "Pause pomo" : "Start pomo"}</button>
                <h1>{formattedTime}</h1>
            </div>
        </>
    )
}

export default Timer
