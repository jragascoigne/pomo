import { useCounterStore } from "./App"

const burger = '≡'

function canFeed(count: number): boolean {
    return count > 0
}

function Feed() {
    const count = useCounterStore((state) => state.count);
    const decreaseCount = useCounterStore((state) => state.decreaseCount);

    const feedPomo = () => {
        if (count > 0) {
            decreaseCount();
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