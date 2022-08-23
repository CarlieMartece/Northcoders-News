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