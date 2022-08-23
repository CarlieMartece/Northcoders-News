import ArticleCard from "./ArticleCard";
import { fetchArticles } from "../api";
import { useState, useEffect } from "react";


export default function AllArticles () {

    const [collection, setCollection] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        fetchArticles()
          .then((articles) => {
            setCollection(articles);
            setIsLoading(false);
          });
    },[]);

    return (
        <main>
            {isLoading? <h3>Loading...</h3> :
            <>
            <ul className="main__list">
                {collection.articles.map((article)=>{
                    let listImg = <></>
                    if (article.topic === "coding") {
                        listImg = <img alt="coding" src={require("../images/coding-icon-white.png")} />
                    } else if (article.topic === "football") {
                        listImg = <img alt="football" src={require("../images/football-icon-white.png")} />
                    } else if (article.topic === "cooking") {
                        listImg = <img alt="cooking" src={require("../images/cooking-icon-white.png")} />
                    }

                    return (
                        <ArticleCard 
                            key={article.article_id}
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