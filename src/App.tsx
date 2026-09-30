import Friend from "./Friend.tsx";
import "./css/App.css";
import Feed from "./Feed.tsx";
import MyTimer from "./Timer.tsx";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const HEALTH_DURATION_MS = 36 * 60 * 60 * 1000;

function drainHealth(health: number, updatedAt: number, now = Date.now()) {
	return Math.max(0, health - ((now - updatedAt) / HEALTH_DURATION_MS) * 100);
}

interface CounterState {
	count: number;
	name: string;
	health: number;
	healthUpdatedAt: number;
	lastFedAt: number | null;
	increaseCount: () => void;
	feedPomo: () => void;
	refreshHealth: () => void;
	setName: (name: string) => void;
}

export const useCounterStore = create<CounterState>()(
	persist(
		(set) => ({
			count: 1,
			name: "Pomo",
			health: 100,
			healthUpdatedAt: Date.now(),
			lastFedAt: null,
			increaseCount: () => set((state) => ({ count: state.count + 1 })),
			feedPomo: () =>
				set((state) => {
					if (state.count === 0) return {};
					const now = Date.now();
					return {
						count: state.count - 1,
						health: Math.min(
							100,
							drainHealth(
								state.health,
								state.healthUpdatedAt,
								now,
							) + 50,
						),
						healthUpdatedAt: now,
						lastFedAt: now,
					};
				}),
			refreshHealth: () =>
				set((state) => {
					const now = Date.now();
					return {
						health: drainHealth(
							state.health,
							state.healthUpdatedAt,
							now,
						),
						healthUpdatedAt: now,
					};
				}),
			setName: (name) => set({ name }),
		}),
		{ name: "pomo-progress" },
	),
);

function App() {
	const expiryTimestamp = new Date();
	expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 1500);

	return (
		<>
			<div className="container">
				<div className="timer-wrapper">
					<MyTimer expiryTimestamp={expiryTimestamp} />

					<Feed />
				</div>
				<div className="pomo-wrapper">
					<Friend />
				</div>

				<div className="footer">
					<a href="https://jra.onl/" target="_">
						jra.onl
					</a>{" "}
					|c| john gascoigne 2026
				</div>
			</div>
		</>
	);
}

export default App;
