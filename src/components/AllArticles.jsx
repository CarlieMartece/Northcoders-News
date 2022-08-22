import { fetchArticles } from "../api";
import { useState, useEffect } from "react";
const dayjs = require('dayjs');

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
                    const date = dayjs(article.created_at);
                    const day = Number(date.$D)
                    const month = Number(date.$M) + 1
                    const year = Number(date.$y)
                    let listImg = <></>

                    if (article.topic === "coding") {
                        listImg = <img alt="coding" src={require("../images/coding-icon-white.png")} />
                    } else if (article.topic === "football") {
                        listImg = <img alt="football" src={require("../images/football-icon-white.png")} />
                    } else if (article.topic === "cooking") {
                        listImg = <img alt="cooking" src={require("../images/cooking-icon-white.png")} />
                    }

                    return (
                        <li key = {article.article_id}>
                            <div className="main__list-card">
                                <div className="main__list-img">{listImg}</div>
                                <div className="main__list-title"><h4>{article.title}</h4></div>
                                <div className="main__list-info"><p>By {article.author} on {day}/{month}/{year}</p></div>  
                            </div>
                        </li>
                    )
                })}
            </ul>
            </>
            }
        </main> 
    )

}