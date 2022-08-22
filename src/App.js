import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Title from "./components/Title";
import UserBar from "./components/UserBar";
import NavBar from "./components/NavBar";
import AllArticles from "./components/AllArticles.jsx";


function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Title />
        <UserBar />
        <NavBar />
        <Routes>
          <Route path="/" element={<AllArticles />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
