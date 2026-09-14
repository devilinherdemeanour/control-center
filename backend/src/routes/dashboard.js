const express = require('express');
const { readCollection } = require('../utils/jsonStore');

const router = express.Router();

router.get('/', (req, res) => {
  const blogs = readCollection('blogs', []);
  const pages = readCollection('pages', []);
  const news = readCollection('news', []);
  const services = readCollection('services', []);
  const lawyers = readCollection('lawyers', []);
  const users = readCollection('users', []);
  const about = readCollection('about', {});
  const settings = readCollection('settings', {});
  const contact = readCollection('contact', {});

  res.json({
    counts: {
      blogs: blogs.length,
      publishedBlogs: blogs.filter((b) => b.status === 'published').length,
      draftBlogs: blogs.filter((b) => b.status === 'draft').length,
      pages: pages.length,
      publishedPages: pages.filter((p) => p.status === 'published').length,
      news: news.length,
      services: services.length,
      lawyers: lawyers.length,
      users: users.length,
    },
    recentBlogs: blogs.slice(0, 5),
    recentNews: news.slice(0, 5),
    aboutUpdatedAt: about.updatedAt || null,
    settingsUpdatedAt: settings.updatedAt || null,
    contactUpdatedAt: contact.updatedAt || null,
    siteName: settings.siteName || 'Aslan İsmayılov and Partners',
  });
});

module.exports = router;
