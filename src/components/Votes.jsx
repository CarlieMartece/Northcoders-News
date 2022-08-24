import { patchVotes } from "../api";
import { useState } from "react";

export default function Votes ({article_id, votes}) {

    const [optimisticVote, setOptimisticVote] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");

    let voteCount = 0
    const incrementVote = () => {
        voteCount++;
        patchVotes (article_id, voteCount).then(() => {
            setErrorMsg("");
            setOptimisticVote((currOptimisticVote) => {
                return currOptimisticVote + 1;
            });
        })
        .catch((err) => {
            if (err.response) {
                setErrorMsg("Request failed...")
            }
        });
    }
    const decreaseVote = () => {
        voteCount--;
        patchVotes (article_id, voteCount).then(() => {
            setErrorMsg("");
            setOptimisticVote((currOptimisticVote) => {
                return currOptimisticVote - 1;
            });
        })
        .catch((err) => {
            if (err.response) {
                setErrorMsg("Request failed...")
            }
        });
    }

    return (
        <div className="article__votes">
            <h4 className="article__votes-count">Votes: {votes + optimisticVote}</h4>
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
            <p className="article__votes-error">{errorMsg}</p>
        </div>
    )

}