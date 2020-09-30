const redis = require('redis');
const fetch_competition_news = require('./competition_news');
const { promisify } = require('util');

// redis client
let client = redis.createClient();
client.on('error', function (error) {
  console.error(error);
});
const setAsync = promisify(client.set).bind(client);

// set fetched news to Redis
const fetch_and_save = async (redis_key, espn_name) => {
  try {
    const news = await fetch_competition_news(espn_name);
    const response = await setAsync(redis_key, JSON.stringify(news));
    console.log(`${redis_key} :`, response);
  } catch (error) {
    console.log(error);
    // exit
    process.exit(1);
  }
};

const competition_news = () => {
  // main competitions
  // eng.1
  fetch_and_save('premier_league_news', 'eng.1');
  // uefa.champions
  fetch_and_save('champions_league_news', 'uefa.champions');
  // esp.1
  fetch_and_save('la_liga_news', 'esp.1');
  // uefa.europa
  fetch_and_save('europa_league_news', 'uefa.europa');
  // ita.1
  fetch_and_save('serie_a_news', 'ita.1');
  // usa.1
  fetch_and_save('major_league_soccer_news', 'usa.1');
  // ger.1
  fetch_and_save('bundesliga_news', 'ger.1');
  // ger.2
  fetch_and_save('bundesliga2_news', 'ger.2');

  // other competitions
  // uefa.euroq
  fetch_and_save('eu_championship_qualifying_news', 'uefa.euroq');
  // concacaf.nations.league
  fetch_and_save('concacaf_nations_news', 'concacaf.nations.league');
};

module.exports = competition_news;
