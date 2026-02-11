import './friend.css'

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

function Friend({ count, justFed }: FriendProps) {
    return (
        <div className="friend">
            .a___ a,<br />
            {handleFace(count, justFed)} 
        </div>
    );
}

export default Friend