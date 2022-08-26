import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Title from "./components/Title";
import UserBar from "./components/UserBar";
import NavBar from "./components/NavBar";
import SortBar from "./components/SortBar";
import SortedArticles from "./components/SortedArticles";
import ErrorPage from "./components/ErrorPage";
import TopicArticles from "./components/TopicArticles";
import SingleArticle from "./components/SingleArticle";


function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Title />
        <UserBar />
        <NavBar />
        <SortBar />
        <Routes>
          <Route path="/" element={<SortedArticles />} />
          <Route path="/*" element={<ErrorPage />} />
          <Route path="/articles/topics/:topic" element={<TopicArticles />} />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
