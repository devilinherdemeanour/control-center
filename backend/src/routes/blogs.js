const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { readCollection, writeCollection } = require('../utils/jsonStore');

const router = express.Router();

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

router.get('/', (req, res) => {
  const blogs = readCollection('blogs', []);
  res.json(blogs);
});

router.get('/:id', (req, res) => {
  const blogs = readCollection('blogs', []);
  const blog = blogs.find((item) => item.id === req.params.id);
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' });
  }
  return res.json(blog);
});

router.post('/', (req, res) => {
  const blogs = readCollection('blogs', []);
  const now = new Date().toISOString();
  const title = (req.body.title || '').trim();
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const blog = {
    id: uuidv4(),
    title,
    slug: req.body.slug ? slugify(req.body.slug) : slugify(title),
    excerpt: req.body.excerpt || '',
    content: req.body.content || '',
    author: req.body.author || 'Admin',
    status: req.body.status === 'published' ? 'published' : 'draft',
    tags: Array.isArray(req.body.tags) ? req.body.tags : [],
    coverImage: req.body.coverImage || '',
    createdAt: now,
    updatedAt: now,
  };

  blogs.unshift(blog);
  writeCollection('blogs', blogs);
  return res.status(201).json(blog);
});

router.put('/:id', (req, res) => {
  const blogs = readCollection('blogs', []);
  const index = blogs.findIndex((item) => item.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Blog not found' });
  }

  const existing = blogs[index];
  const title = (req.body.title || existing.title || '').trim();
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const updated = {
    ...existing,
    title,
    slug: req.body.slug ? slugify(req.body.slug) : existing.slug || slugify(title),
    excerpt: req.body.excerpt !== undefined ? req.body.excerpt : existing.excerpt,
    content: req.body.content !== undefined ? req.body.content : existing.content,
    author: req.body.author !== undefined ? req.body.author : existing.author,
    status: req.body.status === 'published' ? 'published' : req.body.status === 'draft' ? 'draft' : existing.status,
    tags: Array.isArray(req.body.tags) ? req.body.tags : existing.tags,
    coverImage: req.body.coverImage !== undefined ? req.body.coverImage : existing.coverImage,
    updatedAt: new Date().toISOString(),
  };

  blogs[index] = updated;
  writeCollection('blogs', blogs);
  return res.json(updated);
});

router.delete('/:id', (req, res) => {
  const blogs = readCollection('blogs', []);
  const next = blogs.filter((item) => item.id !== req.params.id);
  if (next.length === blogs.length) {
    return res.status(404).json({ error: 'Blog not found' });
  }
  writeCollection('blogs', next);
  return res.status(204).send();
});

module.exports = router;
