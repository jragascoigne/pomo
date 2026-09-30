import { useEffect, useRef, useState } from "react";
import { Pencil } from "lucide-react";
import { useCounterStore } from "./App";
import "./css/Friend.css";

function timeSince(timestamp: number | null) {
	if (!timestamp) return "never";
	const minutes = Math.floor((Date.now() - timestamp) / 60_000);
	if (minutes < 1) return "just now";
	const hours = Math.floor(minutes / 60);
	return hours ? `${hours}h ${minutes % 60}m ago` : `${minutes}m ago`;
}

function Friend() {
	const count = useCounterStore((state) => state.count);
	const name = useCounterStore((state) => state.name);
	const health = useCounterStore((state) => state.health);
	const lastFedAt = useCounterStore((state) => state.lastFedAt);
	const refreshHealth = useCounterStore((state) => state.refreshHealth);
	const setName = useCounterStore((state) => state.setName);
	const previousCount = useRef(count);
	const [mouth, setMouth] = useState("-");

	useEffect(() => {
		const wasFed = count < previousCount.current;
		previousCount.current = count;
		if (!wasFed) return;

		const firstChew = setTimeout(() => setMouth("x"), 0);
		const secondChew = setTimeout(() => setMouth("-"), 250);
		const thirdChew = setTimeout(() => setMouth("x"), 500);
		const rest = setTimeout(() => setMouth("-"), 750);
		return () =>
			[firstChew, secondChew, thirdChew, rest].forEach(clearTimeout);
	}, [count]);

	useEffect(() => {
		const initialRefresh = setTimeout(refreshHealth, 0);
		const healthTimer = setInterval(refreshHealth, 60_000);
		return () => {
			clearTimeout(initialRefresh);
			clearInterval(healthTimer);
		};
	}, [refreshHealth]);

	return (
		<div className="friend">
			<div className="name-input">
				<input
					aria-label="Pomo's name"
					className="name"
					maxLength={24}
					onChange={(event) => setName(event.target.value)}
					value={name}
				/>
				<Pencil aria-hidden="true" className="name-icon" size={16} />
			</div>
			<br />
			.a______ a,
			<br />
			d| : {mouth} : |b
			<div className="health">
				<span>health {Math.ceil(health)}%</span>
				<div
					aria-label="Pomo health"
					aria-valuemax={100}
					aria-valuemin={0}
					aria-valuenow={health}
					className="health-bar"
					id="pomo-health"
					role="progressbar"
				>
					<div className="health-fill" style={{ width: `${health}%` }} />
				</div>
				<span>last fed: {timeSince(lastFedAt)}</span>
			</div>
		</div>
	);
}

export default Friend;
