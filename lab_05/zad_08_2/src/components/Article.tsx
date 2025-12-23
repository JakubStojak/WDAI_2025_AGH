import React from 'react';
import { useParams, Link } from 'react-router-dom';

const Article = () => {
  const { id } = useParams<{ id: string }>(); 
  const savedData = localStorage.getItem('articles');
  const articles = savedData ? JSON.parse(savedData) : [];
  
  const article = articles.find((a: any) => a.id === Number(id));

  if (!article) {
    return <div>Artykuł nie został znaleziony. <Link to="/blog">Wróć</Link></div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{article.title}</h1>
      <hr />
      <p>{article.content}</p>
      <Link to="/blog">← Powrót do listy</Link>
    </div>
  );
};

export default Article;