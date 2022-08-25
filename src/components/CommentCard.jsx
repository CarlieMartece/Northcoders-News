import { deleteComment } from "../api";
import { useState } from "react";
const dayjs = require('dayjs');

export default function CommentCard ({
    commentId,
    author,
    created,
    body,
    votes
})  {

    const currentUser = "jessjelly"

    const [isDeleted, setIsDeleted] = useState(false);
    const [errorMsg, setErrorMsg] = useState();

    const date = dayjs(created);
    const day = Number(date.$D);
    const month = Number(date.$M) + 1;
    const year = Number(date.$y);

    const handleCommentDelete = (event) => {
        let commentId = event.target.value;
        deleteComment(commentId).then(()=>{
            setIsDeleted(true)
        }).catch((err) => {
            if (err.response) {
                setErrorMsg("Request failed...");
            }
        });
    }

    return (
        
        <li className="article__comments-all">
            {isDeleted? <p className="article__comments-deleted">Comment deleted...</p> :
            <>
            <h4 className="article__comments-author">{author}, {day}/{month}/{year}</h4>
            <p className="article__comments-body">{body}</p>
            <p className="article__comments-votes">Votes: {votes}</p>
            <div className="article__comments-delete">
                {currentUser !== author? <></> :
                <><button value={commentId} onClick={handleCommentDelete}>Delete Comment</button></>}
                {errorMsg? <><p>{errorMsg}</p></> :
                <></>}
            </div>
            </>}
        </li>
    )

}