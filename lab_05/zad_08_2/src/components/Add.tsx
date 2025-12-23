import React, { useState } from 'react';
interface Article {
  id: number;
  title: string;
  content: string;
}

const Add = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Proszę uzupełnić tytuł i treść!");
      return;
    }

    const savedArticles = localStorage.getItem('articles');
    
    const articles: Article[] = savedArticles ? JSON.parse(savedArticles) : [];

    const newArticle: Article = {
      id: Math.random(),
      title: title,
      content: content
    };

    const updatedArticles = [...articles, newArticle];
    localStorage.setItem('articles', JSON.stringify(updatedArticles));

  };

  return (
    <div className="container">
      <h2>Dodaj nowy artykuł</h2>
      <form onSubmit={handleAdd} className="add-form">
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block' }}>Tytuł:</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block' }}>Treść:</label>
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button type="submit" className="submit-btn">
          DODAJ
        </button>
      </form>
    </div>
  );
};

export default Add;