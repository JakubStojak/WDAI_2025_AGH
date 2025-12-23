import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


interface Article {
  id: number;
  title: string;
  content: string;
}

const Blog = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const savedData = localStorage.getItem('articles');
    if (savedData) {
      const parsedArticles: Article[] = JSON.parse(savedData);
      setArticles(parsedArticles);
    }
  }, []);

  return (
    <div>
      <h1>Lista artykułów na blogu</h1>
      
      {articles.length === 0 ? (
        <div>
          <p>Brak artykułów do wyświetlenia.</p>
          <Link to="/dodaj">Dodaj swój pierwszy artykuł!</Link>
        </div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {articles.map((article) => (
            <li key={article.id} style={{ marginBottom: '15px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
            <Link 
                to={`/article/${article.id}`} 
                style={{ fontSize: '1.2rem', textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}
              >
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
      
      <div style={{ marginTop: '30px' }}>
        <Link to="/" style={{ marginRight: '15px' }}>Powrót do strony głównej</Link>
        <Link to="/dodaj" style={{ color: 'green', fontWeight: 'bold' }}>+ Dodaj nowy artykuł</Link>
      </div>
    </div>
  );
};

export default Blog;