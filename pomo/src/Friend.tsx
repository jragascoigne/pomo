import { useCounterStore } from './App'
import './css/Friend.css'

interface FriendProps {
    count: number
    justFed: boolean
}

function handleFace(count: number, justFed: boolean): string {
    if (justFed) {
        return 'd| : ~ : |b'

    }
    if (count === 0) {
    }
    return 'd| : - : |b'
}   

function Friend() {
    const count = useCounterStore((state) => state.count)
    const justFed = false

    return (
        <div className="friend">
            .a______ a,<br />
            {handleFace(count, justFed)} 
        </div>
    );
}

export default Friend