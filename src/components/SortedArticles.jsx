import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchArticles } from "../api";
import ArticleCard from "./ArticleCard";

export default function SortedArticles () {

    const [searchParams, setSearchParams] = useSearchParams();
    const [sortedCollection, setSortedCollection] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const sort = searchParams.get("sort_by") || "created_at";
    const order = searchParams.get("order_by") || "DESC";

    useEffect(()=>{
        fetchArticles(sort, order)
          .then((articles) => {
            setSortedCollection(articles);
            setIsLoading(false);
        });
    },[sort, order]);

    return (
        <main>
            {isLoading? <h3>Loading...</h3> :
            <>
            <ul className="main__list">
                {sortedCollection.articles
                    .map((article)=>{
                    const topic = article.topic;
                    const listImg = <img alt={topic} src={require(`../images/${topic}-icon-white.png`)} />
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
            </>
            }
        </main> 
    )

}