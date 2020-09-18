const express = require('express');
const router = express.Router();

// @des     News for news page
// @route   GET /news
router.get('/', (req, res) => {
  res.send('Newspage News');
});

// @des     Homepage news
// @route   GET /news/home
router.get('/home', (req, res) => {
  res.send('Homepage News');
});

// @des     General news
// @route   GET /news/slide
router.get('/general/:id', (req, res) => {
  res.send('General News');
});

// @des     Team news
// @route   GET /news/teamid
router.get('/team/:teamid', (req, res) => {
  res.send('Team News');
});

// @des     Competition news
// @route   GET /news/competetionid
router.get('/competition/:competitionid', (req, res) => {
  res.send('Competition News');
});

// @des     Full news article
// @route   GET /news/competetionid
router.get('/:newsid', (req, res) => {
  res.send('Full News Article');
});

module.exports = router;
