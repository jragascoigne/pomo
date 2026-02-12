const burger = '≡'

interface FeedProps {
  count: number
  setCount: (count: number) => void
  setJustFed: (fed: boolean) => void
}

function canFeed(count: number): boolean {
    return count > 0
}

function Feed({ count, setCount, setJustFed }: FeedProps) {
    const handleFeed = () => {
        if (canFeed(count)) {
            setCount(count - 1)
            setJustFed(true)
            setTimeout(() => setJustFed(false), 1000)
        }
    }

    return (
        <div className='feed-container'>
            {(count === 0) ? <span>NO </span> : <span>{count} </span>}
            {(count === 1 ? <span>BURGER </span> : <span>BURGERS </span>)} 
            {burger.repeat(count)}
            <br />

            <button onClick={handleFeed} disabled={!canFeed(count)}>Feed Pomo</button>
        </div>
    )
}

export default Feed