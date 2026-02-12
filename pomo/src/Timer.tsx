import { useEffect, useState } from 'react';

import './css/App.css'
import './css/Timer.css'

import { useTimer } from 'react-timer-hook';
import { useCounterStore } from './App';

type statusType = 'Focus' | 'Break' | 'Long Break'

type TimerProps = {
	expiryTimestamp: Date;
}

function MyTimer({ expiryTimestamp }: TimerProps) {

	let [pomoStatus, setPomoStatus] = useState<statusType>('Focus')
	let [cycleCount, setCycleCount] = useState(0)
	
	const increaseCount = useCounterStore((state) => state.increaseCount);

	const {
		seconds,
		minutes,
		isRunning,
		pause,
		resume,
		restart,
	} = useTimer({ 
		expiryTimestamp, 
		onExpire: () => {

			if (pomoStatus === 'Focus') {
				setPomoStatus('Break')

				const time = new Date();
				time.setSeconds(time.getSeconds() + 300);
				restart(time);
				setCycleCount(cycleCount + 1)
				increaseCount();

			if (cycleCount === 3) {
					setPomoStatus('Long Break')

					const time = new Date();
					time.setSeconds(time.getSeconds() + 900);
					restart(time);

					setCycleCount(0)
				}

			} else {
				setPomoStatus('Focus')
				const time = new Date();
				time.setSeconds(time.getSeconds() + 1500);
				restart(time);
			}
		}
	});

	useEffect(() => {
		pause();
	}, []);

	return (
		<div className="timer-container" style={{textAlign: 'center'}}>
			<span>{pomoStatus}</span>
			<div style={{ fontSize: '100px' }}>
				<span>{minutes.toString().padStart(2, '0')}</span>:<span>{seconds.toString().padStart(2, '0')}</span>
			</div>

			{ isRunning ? (
				<div className='button-wrapper'>
					<button onClick={pause}>Pause</button> 
				</div>
			) : (
				<div className='button-wrapper'>
					<button onClick={resume}>Resume</button>
					<button onClick={() => {
						const time = new Date();
						time.setSeconds(time.getSeconds() + 300);
						restart(time);
						pause();
					}}>Reset</button>
				</div>
			)}

		</div>
	);
}

export default MyTimer