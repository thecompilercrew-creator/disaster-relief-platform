const express = require('express');
const Parser = require('rss-parser');
const router = express.Router();

const parser = new Parser();

router.get('/', async (req, res) => {
  const topic = req.query.topic || 'India';

  const feeds = {
    India: 'https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en',
    World: 'https://news.google.com/rss?hl=en&gl=US&ceid=US:en',
    Flood: 'https://news.google.com/rss/search?q=flood+disaster',
    Earthquake: 'https://news.google.com/rss/search?q=earthquake+disaster',
    Cyclone: 'https://news.google.com/rss/search?q=cyclone+disaster'
  };

  try {
    const feed = await parser.parseURL(feeds[topic] || feeds.India);
    res.json(feed.items.slice(0, 10));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

module.exports = router;
