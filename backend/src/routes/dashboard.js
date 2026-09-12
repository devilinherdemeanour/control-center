const express = require('express');
const { readCollection } = require('../utils/jsonStore');

const router = express.Router();

router.get('/', (req, res) => {
  const blogs = readCollection('blogs', []);
  const pages = readCollection('pages', []);
  const about = readCollection('about', {});
  const settings = readCollection('settings', {});

  res.json({
    counts: {
      blogs: blogs.length,
      publishedBlogs: blogs.filter((b) => b.status === 'published').length,
      draftBlogs: blogs.filter((b) => b.status === 'draft').length,
      pages: pages.length,
      publishedPages: pages.filter((p) => p.status === 'published').length,
    },
    recentBlogs: blogs.slice(0, 5),
    aboutUpdatedAt: about.updatedAt || null,
    settingsUpdatedAt: settings.updatedAt || null,
    siteName: settings.siteName || 'Admin Panel',
  });
});

module.exports = router;
