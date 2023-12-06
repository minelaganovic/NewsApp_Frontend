import { useState, useEffect } from 'react';
import newsApi from '../api/newsApi.js';

const useNews = () => {
  const [featuredNews, setFeaturedNews] = useState({});
  const [breakingNews, setBreakingNews] = useState([]);
  const [politicalNews, setPoliticalNews] = useState([]);
  const [techNews, setTechNews] = useState([]);
  const [entertainmentNews, setEntertainmentNews] = useState([]);
  const qty = 5;

  const filterFeatured = data => {
    return data.filter(item => item.featured === 'on').reverse()[0];
  };

  const filterByCategory = (data, category) => {
    const result = data
      .filter(item => item.category === category)
      .reverse()
      .splice(0, qty);

    if (result.length) {
      result.push({ type: 'viewMore', category: category, id: category });
    }
    return result;
  };

  const filterMultipleNews = async () => {
    const allNews = await newsApi.getAll();
    setFeaturedNews(filterFeatured(allNews));
    setBreakingNews(filterByCategory(allNews, 'breaking-news'));
    setPoliticalNews(filterByCategory(allNews, 'political'));
    setEntertainmentNews(filterByCategory(allNews, 'entertainment'));
    setTechNews(filterByCategory(allNews, 'tech'));
  };

  useEffect(() => {
    filterMultipleNews();
  }, []);

  return [
    featuredNews,
    politicalNews,
    entertainmentNews,
    techNews,
    breakingNews,
  ];
};

export default useNews;
