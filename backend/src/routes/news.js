const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { readCollection, writeCollection } = require('../utils/jsonStore');
const { slugify, now } = require('../utils/helpers');
const { adminRequired } = require('../middleware/auth');

const router = express.Router();

router.get('/', (req, res) => {
  const items = readCollection('news', []);
  const publishedOnly = req.query.all !== '1';
  res.json(publishedOnly ? items.filter((n) => n.status === 'published') : items);
});

router.get('/:id', (req, res) => {
  const items = readCollection('news', []);
  const item = items.find((n) => n.id === req.params.id || n.slug === req.params.id);
  if (!item) return res.status(404).json({ error: 'Xəbər tapılmadı' });
  return res.json(item);
});

router.post('/', adminRequired, (req, res) => {
  const items = readCollection('news', []);
  const title = (req.body.title || '').trim();
  if (!title) return res.status(400).json({ error: 'Xəbərin adı tələb olunur' });
  const ts = now();
  const item = {
    id: uuidv4(),
    title,
    shortTitle: (req.body.shortTitle || '').trim(),
    slug: req.body.slug ? slugify(req.body.slug) : slugify(title),
    coverImage: req.body.coverImage || '',
    content: req.body.content || '',
    status: req.body.status === 'draft' ? 'draft' : 'published',
    createdAt: ts,
    updatedAt: ts,
  };
  items.unshift(item);
  writeCollection('news', items);
  return res.status(201).json(item);
});

router.put('/:id', adminRequired, (req, res) => {
  const items = readCollection('news', []);
  const index = items.findIndex((n) => n.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Xəbər tapılmadı' });
  const existing = items[index];
  const title = (req.body.title || existing.title || '').trim();
  if (!title) return res.status(400).json({ error: 'Xəbərin adı tələb olunur' });
  const updated = {
    ...existing,
    title,
    shortTitle: req.body.shortTitle !== undefined ? req.body.shortTitle : existing.shortTitle,
    slug: req.body.slug ? slugify(req.body.slug) : existing.slug || slugify(title),
    coverImage: req.body.coverImage !== undefined ? req.body.coverImage : existing.coverImage,
    content: req.body.content !== undefined ? req.body.content : existing.content,
    status: req.body.status === 'draft' ? 'draft' : req.body.status === 'published' ? 'published' : existing.status,
    updatedAt: now(),
  };
  items[index] = updated;
  writeCollection('news', items);
  return res.json(updated);
});

router.delete('/:id', adminRequired, (req, res) => {
  const items = readCollection('news', []);
  const next = items.filter((n) => n.id !== req.params.id);
  if (next.length === items.length) return res.status(404).json({ error: 'Xəbər tapılmadı' });
  writeCollection('news', next);
  return res.status(204).send();
});

module.exports = router;
