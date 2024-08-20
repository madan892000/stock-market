import React, { useEffect, useState } from 'react';
import './Analysis.css';

const Analysis = ({ name }) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10); // Default limit to 10

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const fetchNewsData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.polygon.io/v2/reference/news?ticker=${name.toUpperCase()}&limit=${limit}&apiKey=7pur3uCKisa8uoLDiKXvP9kEzYEkzQ4i`
      );
      const data = await response.json();
      setNewsData(data.results || []);
      setLoading(false);
    } catch (error) {
      setError('Error fetching news data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, [limit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchNewsData();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="analysis-container">
      <h3>Analysis for {name.toUpperCase()}</h3>
      <form onSubmit={handleSubmit} className="limit-form">
        <label htmlFor="limit">Limit: </label>
        <input
          type="number"
          id="limit"
          value={limit}
          onChange={handleLimitChange}
          min="1"
          className="limit-input"
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>
      
      {/* News Data Table */}
      <table className="analysis-table">
        <thead>
          <tr>
            <th>Publisher</th>
            <th>Title</th>
            <th>Published Date</th>
            <th>Description</th>
            <th>Image</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {newsData.map((news, index) => (
            <tr key={index}>
              <td>
                <a href={news.publisher.homepage_url} target="_blank" rel="noopener noreferrer">
                  <img src={news.publisher.logo_url} alt={news.publisher.name} className="publisher-logo" />
                </a>
              </td>
              <td>{news.title}</td>
              <td>{new Date(news.published_utc).toLocaleDateString()}</td>
              <td>{news.description}</td>
              <td>
                {news.image_url ? <img src={news.image_url} alt={news.title} className="news-image" /> : 'No Image'}
              </td>
              <td>
                <a href={news.article_url} target="_blank" rel="noopener noreferrer">Read More</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Analysis;
