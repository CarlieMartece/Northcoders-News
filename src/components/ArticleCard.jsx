import { Link } from "react-router-dom";
const dayjs = require('dayjs');


export default function ArticleCard ({
    articleId,
    img,
    title,
    author,
    created,
    votes
}) {
    
    const date = dayjs(created);
    const day = Number(date.$D)
    const month = Number(date.$M) + 1
    const year = Number(date.$y)

    return (
        <Link to={`/articles/${articleId}`}>
            <li>
                <div className="main__list-card">
                    <div className="main__list-img">{img}</div>
                    <div className="main__list-title"><h4>{title}</h4></div>
                    <div className="main__list-votes"><p>Votes: {votes}</p></div>
                    <div className="main__list-info"><p>By {author} on {day}/{month}/{year}</p></div>  
                </div>
            </li>
        </Link>
    )
}

