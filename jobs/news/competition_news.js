const fetch = require('node-fetch');

// const espn hidden api base url
const main_url = 'http://site.api.espn.com/apis/site/v2/sports/soccer/';

// Fetch league news
const fetch_news = async (league) => {
  const res = await fetch(`${main_url}${league}/news`);
  const response = await res.json();
  const links = response.articles.map((article) => article.links.api.news.href);

  // loop and make api call to all links to extract desired info
  const news_promise = await links.map(async (link) => {
    const fetch_link = await fetch(link);
    const fetch_res = await fetch_link.json();
    return fetch_res;
  });
  const news = await Promise.all(news_promise);
  // console.log(news);
  return news;
};

module.exports = fetch_news;
