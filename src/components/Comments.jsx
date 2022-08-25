import { getComments, postComment, deleteComment } from "../api";
import { useState } from "react";
const dayjs = require('dayjs');

export default function Comments ({ article_id, comment_count }) {

    const currentUser = "jessjelly"

    const initialValues = {
        optimisticComments: 0,
        commentObj: {},
        isLoading: true,
        newComment: undefined,
        errorMsg: '',
        submitMsg: '',
        loadHide: 'load'
    };
    const [values, setValues] = useState(initialValues);

    const loadComments = () => {
        getComments(article_id).then((comments)=>{
            const revComments = comments.comments.reverse();
            setValues({                              
                ...values,
                commentObj: {revComments},
                isLoading: false,
                loadHide: 'hide'       
            });
        });
    };

    const hideComments = () => {
        setValues({                              
            ...values,
            isLoading: true, 
            commentObj: "",
            loadHide: 'load'
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
            event.preventDefault();
            postComment(article_id, currentUser, values.newComment).then(()=>{
                setValues({                              
                    ...values,
                    errorMsg: "",
                    submitMsg: "Comment added",
                    optimisticComments: 1,
                });
                window.location.reload(false);
            }).catch((err) => {
                if (err.response) {
                    setValues({                              
                        ...values,
                        errorMsg: "Request failed...",
                    });
                }
            });
        }
    }

    const handleCommentDelete = (event) => {
        deleteComment(event.target.value);
    }

    const loadButton = <button className="article__comments-button" onClick={loadComments}>View Comments</button>
    const hideButton = <button className="article__comments-button" onClick={hideComments}>Hide Comments</button>

    return (
        <>
        <section className="article__comments">
            <h4 className="article__comments-count">Comments: {comment_count + values.optimisticComments}</h4>
            <div className="article__comments-view">
                {values.loadHide === "load"? <>{loadButton}</> : <>{hideButton}</>}
            </div>
        </section>
        <section className="article__comments--loaded">
            {values.isLoading? <></> :
            <>
            <ul className="comment__list">
                {values.commentObj.revComments.map((comment)=>{
                    const date = dayjs(comment.created_at);
                    const day = Number(date.$D);
                    const month = Number(date.$M) + 1;
                    const year = Number(date.$y);
                    return (
                        <li className="article__comments-all" key={comment.comment_id}>
                            <h4 className="article__comments-author">{comment.author}, {day}/{month}/{year}</h4>
                            <p className="article__comments-body">{comment.body}</p>
                            <p className="article__comments-votes">Votes: {comment.votes}</p>
                            <div className="article__comments-delete">{currentUser !== comment.author? <></> :
                            <><button value={comment.comment_id} onClick={handleCommentDelete}>Delete Comment</button></>}</div>
                        </li>
                    )
                })}
            </ul>
            {hideButton}
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