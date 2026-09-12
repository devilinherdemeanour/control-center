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
  res.json(readCollection('pages', []));
});

router.get('/:id', (req, res) => {
  const pages = readCollection('pages', []);
  const page = pages.find((item) => item.id === req.params.id);
  if (!page) {
    return res.status(404).json({ error: 'Page not found' });
  }
  return res.json(page);
});

router.post('/', (req, res) => {
  const pages = readCollection('pages', []);
  const now = new Date().toISOString();
  const title = (req.body.title || '').trim();
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const page = {
    id: uuidv4(),
    title,
    slug: req.body.slug ? slugify(req.body.slug) : slugify(title),
    status: req.body.status === 'published' ? 'published' : 'draft',
    seoTitle: req.body.seoTitle || title,
    seoDescription: req.body.seoDescription || '',
    content: req.body.content || '',
    createdAt: now,
    updatedAt: now,
  };

  pages.unshift(page);
  writeCollection('pages', pages);
  return res.status(201).json(page);
});

router.put('/:id', (req, res) => {
  const pages = readCollection('pages', []);
  const index = pages.findIndex((item) => item.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Page not found' });
  }

  const existing = pages[index];
  const title = (req.body.title || existing.title || '').trim();
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const updated = {
    ...existing,
    title,
    slug: req.body.slug ? slugify(req.body.slug) : existing.slug || slugify(title),
    status: req.body.status === 'published' ? 'published' : req.body.status === 'draft' ? 'draft' : existing.status,
    seoTitle: req.body.seoTitle !== undefined ? req.body.seoTitle : existing.seoTitle,
    seoDescription: req.body.seoDescription !== undefined ? req.body.seoDescription : existing.seoDescription,
    content: req.body.content !== undefined ? req.body.content : existing.content,
    updatedAt: new Date().toISOString(),
  };

  pages[index] = updated;
  writeCollection('pages', pages);
  return res.json(updated);
});

router.delete('/:id', (req, res) => {
  const pages = readCollection('pages', []);
  const next = pages.filter((item) => item.id !== req.params.id);
  if (next.length === pages.length) {
    return res.status(404).json({ error: 'Page not found' });
  }
  writeCollection('pages', next);
  return res.status(204).send();
});

module.exports = router;
