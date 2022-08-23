import { patchVotes } from "../api";

export default function Votes ({article_id, votes}) {

    let voteCount = 0
    const incrementVote = () => {
        voteCount++;
        patchVotes (article_id, voteCount).then((newVotes)=>{
            console.log(newVotes)
        })
    }
    const decreaseVote = () => {
        voteCount--;
        patchVotes (article_id, voteCount).then((newVotes)=>{
            console.log(newVotes)
        })
    }

    return (
        <div className="article__votes">
            <h4 className="article__votes-count">Votes: {votes}</h4>
            <button 
                className="article__votes-upvote"
                onClick={incrementVote}
            >
                UpVote
            </button>
            <button 
                className="article__votes-downvote"
                onClick={decreaseVote}
            >
                DownVote
            </button>
        </div>
    )

}