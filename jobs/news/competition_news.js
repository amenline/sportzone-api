const fetch = require('node-fetch');

// const base url
const main_url = 'http://site.api.espn.com/apis/site/v2/sports/soccer/';

// Fetch Premier League news
const fetch_league = async (league) => {
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
  console.log(news);
  return news;
};

const premier_league_news = fetch_league('eng.1');
const champions_league = fetch_league('uefa.champions');
const la_liga_news = fetch_league('esp.1');
const europa_league_news = fetch_league('uefa.europa');
const serie_a_news = fetch_league('ita.1');
const major_league_soccer_news = fetch_league('USA.1');
const bundesliga_news = fetch_league('ger.1');
