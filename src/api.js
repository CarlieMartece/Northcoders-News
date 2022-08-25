import axios from "axios";
const api = axios.create({
    baseURL: "https://nookas-news.herokuapp.com/api"
}) 

export const fetchArticles = (sort, order) => {
    return api.get('/articles', { params: { sort_by: sort, order_by: order } })
        .then((res) => {
            return res.data;
        });
};

export const fetchTopic = (topic) => {
    return api.get(`/articles?topic=${topic}`)
        .then((res) => {
            return res.data;
        });
};

export const fetchSingleArticle = (article_id) => {
    return api.get(`/articles/${article_id}`)
        .then((res) => {
            return res.data;
        });
}

export const patchVotes = (article_id, count) => {
    return api.patch(`/articles/${article_id}`, { inc_votes: count });
}

export const getComments = (article_id) => {
    return api.get(`/articles/${article_id}/comments`)
    .then((res) => {
        return res.data;
    });
}