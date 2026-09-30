import { useCounterStore } from "./App"

const burger = '≡'

function playChomp() {
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;

    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(260, now);
    oscillator.frequency.exponentialRampToValueAtTime(95, now + 0.18);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.16, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    oscillator.connect(gain).connect(context.destination);
    oscillator.onended = () => void context.close();
    oscillator.start(now);
    oscillator.stop(now + 0.18);
}

function canFeed(count: number): boolean {
    return count > 0
}

function Feed() {
    const count = useCounterStore((state) => state.count);
    const feed = useCounterStore((state) => state.feedPomo);

    const feedPomo = () => {
        if (count > 0) {
            playChomp();
            feed();
        }
    }

    return (
        <div className='feed-container'>
            <span className="feed-label">
                {(count === 0) ? <span>NO </span> : <span>{count} </span>}
                {(count === 1 ? <span>BURGER </span> : <span>BURGERS </span>)} 
                {burger.repeat(count)}
            </span>
        
            <button onClick={feedPomo} disabled={!canFeed(count)}>{count === 0 && "Cannot"} Feed Pomo</button>
        </div>
    )
}

export default Feed
