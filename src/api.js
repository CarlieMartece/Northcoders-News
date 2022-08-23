import axios from "axios";
const api = axios.create({
    baseURL: "https://nookas-news.herokuapp.com/api"
}) 

export const fetchArticles = () => {
    return fetch('https://nookas-news.herokuapp.com/api/articles')
        .then((res) => {
            return res.json();
        });
};

export const fetchTopic = (topic) => {
    return fetch(`https://nookas-news.herokuapp.com/api/articles?topic=${topic}`)
        .then((res) => {
            return res.json();
        });
};

export const fetchSingleArticle = (article_id) => {
    return fetch(`https://nookas-news.herokuapp.com/api/articles/${article_id}`)
    .then((res) => {
        return res.json();
    });
}

export const patchVotes = (article_id, count) => {
    return api.patch(`/articles/${article_id}`, { inc_votes: count }).then((res) => {
        return res.data.article.votes
    })
}