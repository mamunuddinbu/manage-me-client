import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const News = () => {
  const [news, setNews] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('us'); // Default country is 'rs'

  useEffect(() => {
    fetchNews();
  }, [selectedCountry]);

  const fetchNews = () => {
    fetch(
      `https://newsapi.org/v2/top-headlines?country=${selectedCountry}&apikey=3ea71198cdef4604a732761106382b35`
    )
      .then((res) => res.json())
      .then((data) => setNews(data?.articles));
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="country">Select a country:</label>
        <select
          id="country"
          value={selectedCountry}
          onChange={handleCountryChange}
          className="p-2 border"
        >
          <option value="us">United States</option>
          <option value="ar">Argentina</option>
          <option value="at">Austria</option>
          <option value="cn">China</option>
          <option value="in">India</option>
        </select>
      </div>
      <p>Number of news: {news.length}</p>
      {news.map((singleNews) => (
        <div className="m-4 border-4" key={singleNews.url}>
          <h3 className="font-bold">{singleNews.title}</h3>
          <img className="h-20" src={singleNews?.urlToImage} alt="" />
          <p className="mt-2">{singleNews.description}</p>
          <Link
            to={`/news/${encodeURIComponent(singleNews.title)}`}
            className="text-blue-500 underline"
          >
            Show Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default News;
