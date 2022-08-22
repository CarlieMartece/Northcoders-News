export const fetchArticles = () => {
    return fetch('https://nookas-news.herokuapp.com/api/articles')
        .then((res) => {
            return res.json();
        });
};