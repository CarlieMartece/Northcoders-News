import { getComments, postComment } from "../api";
import { useState } from "react";
const dayjs = require('dayjs');

export default function Comments ({ article_id, comment_count }) {

    const [commentArray, setCommentArray] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [newComment ,setNewComment] = useState('');

    const loadComments = () => {
        getComments(article_id).then((comments)=>{
            setCommentArray(comments);
            setIsLoading(false);
        });
    };

    const hideComments = () => {
        setIsLoading(true);
        setCommentArray("")
    }

    let date = {};
    let day, month, year = 0;

    if (!isLoading) {
        date = dayjs(commentArray.comments.created_at);
        day = Number(date.$D);
        month = Number(date.$M) + 1;
        year = Number(date.$y);
    }

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    }

    const handleSubmit = () => {
        postComment(article_id, "jessjelly", newComment)
    }


    return (
        <>
        <section className="article__comments">
            <h4 className="article__comments-count">Comments: {comment_count}</h4>
            <button 
                className="article__comments-view"
                onClick={loadComments}
            >
                View Comments
            </button>
        </section>
        <section className="article__comments--loaded">
            {isLoading? <></> :
            <>
            <ul className="comment__list">
                {commentArray.comments.map((comment)=>{
                    return (
                        <li className="article__comments-all" key={comment.comment_id}>
                            <h4>{comment.author}, {day}/{month}/{year}</h4>
                            <p>{comment.body}</p>
                            <p>Votes: {comment.votes}</p>
                        </li>
                    )
                })}
            </ul>
            <button 
                className="article__comments-hide"
                onClick={hideComments}
            >
                Hide Comments
            </button>
            </>
            }
        </section>
        <section className="article__comments-form">
            <form onSubmit={handleSubmit}>
            <label htmlFor="comment-body">Add Comment:</label>
                <textarea 
                    id="comment-body"
                    name="comment-body"
                    placeholder="Your comment..."
                    onChange={(event) => {handleCommentChange(event)}}
                    >
            </textarea>
            <input type="submit" value="Submit Comment"></input>
            </form>
        </section>
        </>
    )

}