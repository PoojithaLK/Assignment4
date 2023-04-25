import React, { useState, useEffect } from 'react';

const apiUrl = 'https://newsapi.org/v2/top-headlines?country=us&pageSize=6&apiKey=';

const NewsFeed = () => {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isComponentMounted = true;
    const fetchNewsData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('API response not ok');
        const data = await response.json();
        if (isComponentMounted) {
          setNewsData(data.articles.slice(2));
          setIsLoading(false);
          setHasError(false);
        }
      } catch (error) {
        console.error(error);
        if (isComponentMounted) {
          setNewsData([]);
          setIsLoading(false);
          setHasError(true);
        }
      }
    };
    fetchNewsData();
    const intervalId = setInterval(fetchNewsData, 60000);
    return () => {
      isComponentMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  const renderNewsData = () => {
    if (isLoading) {
      return (
        <div className='loader'>
          <span className="loader__element"></span>
          <span className="loader__element"></span>
          <span className="loader__element"></span>
          <span className="loader__element"></span>
        </div>
      );
    }
    if (hasError) {
      return <div>API request failed. Please try again later.</div>;
    }
    return newsData.map((news) => (
      <div className="APIcontent" key={news.url} style={{ marginLeft: '10px' }}>
        <h3>{news.title}</h3>
        <img
          src={news.urlToImage}
          alt={news.title}
          style={{ height: '33vh', width: '32vw' }}
        />
        <p className="source_des">
          <strong>{news.description}</strong>
        </p>
        <p className="source_name">{news.source.name}</p>
        <p>{new Date(news.publishedAt).toLocaleDateString()}</p>
        <p className="source_content">{news.content}</p>
        <p className="source_url">
          <a href={news.url} target="_blank" rel="noopener noreferrer">
            {news.url}
          </a>
        </p>
      </div>
    ));
  };

  return (
    <div className="newsfeed">
      {renderNewsData()}
    </div>
  );
};

export default NewsFeed;
