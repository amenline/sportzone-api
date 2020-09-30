const express = require('express');
const router = express.Router();
const redis = require('redis');
const { promisify } = require('util');

// redis client
let client = redis.createClient();
client.on('error', function (error) {
  console.error(error);
});
const getAsync = promisify(client.get).bind(client);

/**
 * premier_league_news                = epl
 * champions_league_news              = uc
 * la_liga_news                       = lal
 * europa_league_news                 = eup
 * serie_a_news                       = ser
 * major_league_soccer_news           = mjs
 * bundesliga_news                    = bunl
 * bundesliga2_news                   = bunl2
 * eu_championship_qualifying_news    = euq
 * concacaf_nations_news              = cn
 */

// @des     Premier League News
// @route   GET /api/news/epl
router.get('/epl', async (req, res) => {
  try {
    const news = await getAsync('premier_league_news');
    res.send(JSON.parse(news));
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

// @des     Champions League News
// @route   GET /api/news/uc
router.get('/uc', async (req, res) => {
  try {
    const news = await getAsync('champions_league_news');
    res.send(JSON.parse(news));
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

// @des     La Liga News
// @route   GET /api/news/lal
router.get('/lal', async (req, res) => {
  try {
    const news = await getAsync('la_liga_news');
    res.send(JSON.parse(news));
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

// @des     Europa League News
// @route   GET /api/news/eup
router.get('/eup', async (req, res) => {
  try {
    const news = await getAsync('europa_league_news');
    res.send(JSON.parse(news));
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

// @des     Serie A News
// @route   GET /api/news/ser
router.get('/ser', async (req, res) => {
  try {
    const news = await getAsync('serie_a_news');
    res.send(JSON.parse(news));
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

// @des     Major League Soccer News
// @route   GET /api/news/mjs
router.get('/mjs', async (req, res) => {
  try {
    const news = await getAsync('major_league_soccer_news');
    res.send(JSON.parse(news));
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

// @des     Bundesliga News
// @route   GET /api/news/bunl
router.get('/bunl', async (req, res) => {
  try {
    const news = await getAsync('bundesliga_news');
    res.send(JSON.parse(news));
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

// @des     Bundesliga2 News
// @route   GET /api/news/bunl2
router.get('/bunl2', async (req, res) => {
  try {
    const news = await getAsync('bundesliga2_news');
    res.send(JSON.parse(news));
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

// @des     European Championship Qualifying News
// @route   GET /api/news/euq
router.get('/euq', async (req, res) => {
  try {
    const news = await getAsync('eu_championship_qualifying_news');
    res.send(JSON.parse(news));
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

// @des     Concacaf Nations News
// @route   GET /api/news/cn
router.get('/cn', async (req, res) => {
  try {
    const news = await getAsync('concacaf_nations_news');
    res.send(JSON.parse(news));
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

module.exports = router;
