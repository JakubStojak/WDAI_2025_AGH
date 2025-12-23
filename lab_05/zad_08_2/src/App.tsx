import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Blog from './components/Blog';
import Add from './components/Add';
import Article from './components/Article';
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '10px', background: '#34644eff', marginBottom: '20px'}}>
        <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
        <Link to="/blog" style={{ marginRight: '10px' }}>Blog</Link>
        <Link to="/dodaj">Dodaj</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/dodaj" element={<Add />} />
        <Route path="/article/:id" element={<Article />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;