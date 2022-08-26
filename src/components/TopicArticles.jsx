import { useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchTopic } from "../api";
import ArticleCard from "./ArticleCard";
import ErrorPage from "./ErrorPage";

export default function TopicArticles () {

    const { topic } = useParams();
    const [collection, setCollection] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const sort = searchParams.get("sort_by") || "created_at";
    const order = searchParams.get("order_by") || "DESC";

    useEffect(()=>{
        fetchTopic(topic, sort, order)
          .then((items) => {
            setCollection(items);
            setIsLoading(false);
          }).catch((err)=>{
            if(err.response) {
                setIsError(true);
            }
          })
    },[topic, sort, order]);

    return (
        <main>
            {isError? <ErrorPage/> : <>
            {isLoading? <h3>Loading...</h3> :
            <>
            <ul className="main__list">
                {collection.articles.map((article)=>{
                    let listImg = <img alt={topic} src={require(`../images/${topic}-icon-white.png`)} />

                    return (
                        <ArticleCard 
                            key={article.article_id}
                            articleId={article.article_id}
                            title={article.title}
                            author={article.author}
                            created={article.created_at}
                            votes={article.votes}
                            img={listImg}
                        />
                    )
                })}
            </ul>
            </>}
            </>}
        </main> 
    )

}