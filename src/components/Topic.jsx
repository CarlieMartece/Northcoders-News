import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchTopic } from "../api";
import ArticleCard from "./ArticleCard";

export default function Topic () {

    const { topic } = useParams();
    const [collection, setCollection] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        fetchTopic(topic)
          .then((items) => {
            setCollection(items);
            setIsLoading(false);
          });
    },[topic]);

    return (
        <main>
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