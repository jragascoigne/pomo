import { useEffect, useState } from "react";

import "./css/App.css";
import "./css/Timer.css";

import { useTimer } from "react-timer-hook";
import { useCounterStore } from "./App";

type statusType = "Focus" | "Break" | "Long Break";

type TimerProps = {
	expiryTimestamp: Date;
};

function playThock(frequency: number, duration = 0.08) {
	const context = new AudioContext();
	const oscillator = context.createOscillator();
	const gain = context.createGain();
	const now = context.currentTime;

	oscillator.type = "triangle";
	oscillator.frequency.setValueAtTime(frequency, now);
	oscillator.frequency.exponentialRampToValueAtTime(frequency / 2, now + duration);
	gain.gain.setValueAtTime(0.001, now);
	gain.gain.exponentialRampToValueAtTime(0.16, now + 0.004);
	gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
	oscillator.connect(gain).connect(context.destination);
	oscillator.onended = () => void context.close();
	oscillator.start(now);
	oscillator.stop(now + duration);
}

function playSuccessSound() {
	playThock(150, 0.12);
	setTimeout(() => playThock(110, 0.65), 140);
}

function MyTimer({ expiryTimestamp }: TimerProps) {
	const [pomoStatus, setPomoStatus] = useState<statusType>("Focus");
	const [cycleCount, setCycleCount] = useState(0);

	const increaseCount = useCounterStore((state) => state.increaseCount);

	const { seconds, minutes, isRunning, pause, resume, restart } = useTimer({
		expiryTimestamp,
		autoStart: false,
		onExpire: () => {
			playSuccessSound();

			if (pomoStatus === "Focus") {
				const isLongBreak = cycleCount === 2;
				setPomoStatus(isLongBreak ? "Long Break" : "Break");
				setCycleCount(isLongBreak ? 0 : cycleCount + 1);
				increaseCount();

				const time = new Date();
				time.setSeconds(time.getSeconds() + (isLongBreak ? 900 : 300));
				setTimeout(() => restart(time), 0);
			} else {
				setPomoStatus("Focus");
				const time = new Date();
				time.setSeconds(time.getSeconds() + 1500);
				setTimeout(() => restart(time), 0);
			}
		},
	});

	useEffect(() => {
		document.title = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} - ${pomoStatus}`;
	}, [minutes, seconds, pomoStatus]);

	const startTimer = () => {
		playThock(220);
		resume();
	};

	const stopTimer = () => {
		playThock(110);
		pause();
	};

	return (
		<div className="timer-container" style={{ textAlign: "center" }}>
			<span className="timer-status">{pomoStatus}</span>
			<div className="timer-display">
				<span>{minutes.toString().padStart(2, "0")}</span>:
				<span>{seconds.toString().padStart(2, "0")}</span>
			</div>

			{isRunning ? (
				<div className="button-wrapper">
					<button onClick={stopTimer}>Pause</button>
				</div>
			) : (
				<div className="button-wrapper">
					<button onClick={startTimer}>Resume</button>
					<button
						onClick={() => {
							setPomoStatus("Focus");
							setCycleCount(0);
							const time = new Date();
							time.setSeconds(time.getSeconds() + 1500);
							restart(time, false);
						}}
					>
						Reset
					</button>
				</div>
			)}
		</div>
	);
}

export default MyTimer;
