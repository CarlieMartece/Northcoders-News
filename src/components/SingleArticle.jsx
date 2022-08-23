import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleArticle } from "../api";
const dayjs = require('dayjs');

export default function SingleArticle () {

    const { article_id } = useParams();
    const [collection, setCollection] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(()=>{
        fetchSingleArticle(article_id).then((article)=>{
            setCollection(article);
            setIsLoading(false);
        })
    },[article_id]);

    let title, author, body, date, votes, comment_count = {};
    let day, month, year = 0;

    if (!isLoading) {
        title = collection.article.title;
        author = collection.article.author;
        body = collection.article.body;
        date = dayjs(collection.article.created_at);
        day = Number(date.$D);
        month = Number(date.$M) + 1;
        year = Number(date.$y);
        votes = collection.article.votes;
        comment_count = collection.article.comment_count;
    }

    return (
        <main>
            {isLoading? <h3>Loading...</h3> :
            <>
            <article className="main__article">
                <h2>{title}</h2>
                <p className="main__info">By {author} on {day}/{month}/{year}</p>
                <p>{body}</p>
                <section>
                    <div className="article__votes">
                        <h4>Votes: {votes}</h4>
                    </div>
                    <div className="article__comments">
                        <h4>Comment Count: {comment_count}</h4>
                    </div>
                </section>
            </article>
            </>}
        </main>
    );
}