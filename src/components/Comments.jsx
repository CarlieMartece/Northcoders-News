import { getComments, postComment } from "../api";
import { useState } from "react";
const dayjs = require('dayjs');

export default function Comments ({ article_id, comment_count }) {

    const initialValues = {
        commentObj: [],
        isLoading: true,
        newComment: undefined,
        errorMsg: '',
        submitMsg: ''
    };
    const [values, setValues] = useState(initialValues);

    const loadComments = () => {
        getComments(article_id).then((comments)=>{
            setValues({                              
                ...values,
                commentObj: comments,
                isLoading: false,          
            });
        });
    };

    const hideComments = () => {
        setValues({                              
            ...values,
            isLoading: true, 
            commentObj: "",
        });
    }

    const handleCommentChange = (event) => {
        setValues({ ...values, newComment: event.target.value });
    }

    const handleSubmit = (event) => {
        
        if (values.newComment === undefined) {
            event.preventDefault();
            setValues({                              
                ...values,
                submitMsg: "",
                errorMsg: "Cannot send blank comment!"
            });
        } else {
            postComment(article_id, "jessjelly", values.newComment);
            event.preventDefault();
            setValues({                              
                ...values,
                errorMsg: "",
                submitMsg: "Comment added"
            });
        }
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
            {values.isLoading? <></> :
            <>
            <ul className="comment__list">
                {values.commentObj.comments.map((comment)=>{
                    const date = dayjs(comment.created_at);
                    const day = Number(date.$D);
                    const month = Number(date.$M) + 1;
                    const year = Number(date.$y);
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
        <section className="article__comment-form">
        <form onSubmit={(event) => handleSubmit(event)}>
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
            <p className="article__comment-submitted">{values.errorMsg}{values.submitMsg}</p>
        </section>
        </>
    )

}