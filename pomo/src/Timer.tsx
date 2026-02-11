import './App.css'
import './timer.css'

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

function Timer({ timer, setTimer, isTimerActive, setIsTimerActive }: TimerProps) {
    if (isTimerActive && timer > 0) {
        tick(setTimer, timer);
    }

    if (timer === 0) {
        setIsTimerActive(false);
        setTimer(600);
    }

    const minutes = Math.floor((timer % 3600) / 60);
    const seconds = timer % 60;
    
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toFixed(0).padStart(2, '0')}`;
    document.title = `${formattedTime} - (:-:)::`

    return (
        <div className="timer-container">
            <button onClick={() => setIsTimerActive(!isTimerActive)}>
                {isTimerActive ? "Pause pomo" : "Start pomo"}
            </button>
            <h1>{formattedTime}</h1>
        </div>
    )
}

export default Timer