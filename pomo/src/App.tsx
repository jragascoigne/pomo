import Friend from './Friend.tsx'
import './css/App.css'
import Feed from './Feed.tsx'
import MyTimer from './Timer.tsx'

import { create } from 'zustand';

interface CounterState {
  count: number;
  increaseCount: () => void;
  decreaseCount: () => void;
}

export const useCounterStore = create<CounterState>()((set) => ({
  count: 0,
  increaseCount: () => set((state) => ({ count: state.count + 1 })),
  decreaseCount: () => set((state) => ({ count: state.count - 1 })),
}));


function App() {
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
		<div className='pomo-wrapper'>
			<MyTimer 
				expiryTimestamp={expiryTimestamp}
			/>

			<Feed />
			<Friend />
		</div>

		<div className="footer">
			<a href='https://jra.onl/' target='_'>jra.onl</a> |c| john gascoigne 2026
		</div>
	</>
	)
}

export default App