import './App.css';
import ArticleList from './ArticleList';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AddArticle from './AddArticle';
import Reference from './Reference';



function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element = {<ArticleList/>} />
            <Route path="/AddArticle" element = {<AddArticle/>} />
            <Route path="/AddArticle/:id" element = {<AddArticle/>} />
            <Route path="/Reference/:id" element = {<Reference/>} />
          </Routes>
        
        </BrowserRouter>
    </div>
  );
}

export default App;
