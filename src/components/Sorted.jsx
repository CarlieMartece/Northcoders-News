import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchSortOrder } from "../api";
import ArticleCard from "./ArticleCard";

export default function Sorted () {

    const [searchParams, setSearchParams] = useSearchParams();
    const [sorted, setSorted] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const sort = searchParams.get("sort_by");
    const order = searchParams.get("order_by");

    useEffect(()=>{
        fetchSortOrder(sort, order)
          .then((articles) => {
            setSorted(articles);
            setIsLoading(false);
        });
    },[sort, order]);

    return (
        <main>
            {isLoading? <h3>Loading...</h3> :
            <>
            <ul className="main__list">
                {sorted.articles
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