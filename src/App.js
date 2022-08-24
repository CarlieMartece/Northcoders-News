import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Title from "./components/Title";
import UserBar from "./components/UserBar";
import NavBar from "./components/NavBar";
import HomeArticles from "./components/HomeArticles";
import Sorted from "./components/Sorted";
import Topic from "./components/Topic";
import SingleArticle from "./components/SingleArticle";


function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Title />
        <UserBar />
        <NavBar />
        <Routes>
          <Route path="/" element={<HomeArticles />} />
          <Route path="/articles" element={<Sorted />} />
          <Route path="/articles/topics/:topic" element={<Topic />} />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
