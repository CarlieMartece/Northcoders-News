import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


export default function ErrorPage () {

    const { article_id, topic } = useParams();
    let errorType = "Page";
    if (article_id) {
        errorType = "Article"
    } else if (topic) {
        errorType = "Topic"
    };

    return (
        <main>
            <h3>{errorType} not found</h3>
            <Link to="/"><h2>Back to Home</h2></Link>
            <img className="error__img" alt={topic} src={require(`../images/5005.jpeg`)} />
        </main>
    )

}