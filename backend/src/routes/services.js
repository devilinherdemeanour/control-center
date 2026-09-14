const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { readCollection, writeCollection } = require('../utils/jsonStore');
const { slugify, now } = require('../utils/helpers');
const { adminRequired } = require('../middleware/auth');

const router = express.Router();

router.get('/', (req, res) => {
  const items = readCollection('services', []);
  const list = req.query.all === '1' ? items : items.filter((s) => s.status === 'published');
  list.sort((a, b) => (a.order || 0) - (b.order || 0));
  res.json(list);
});

router.get('/:id', (req, res) => {
  const items = readCollection('services', []);
  const item = items.find((s) => s.id === req.params.id || s.slug === req.params.id);
  if (!item) return res.status(404).json({ error: 'Xidmət tapılmadı' });
  return res.json(item);
});

router.post('/', adminRequired, (req, res) => {
  const items = readCollection('services', []);
  const title = (req.body.title || '').trim();
  if (!title) return res.status(400).json({ error: 'Xidmətin adı tələb olunur' });
  const ts = now();
  const item = {
    id: uuidv4(),
    title,
    slug: req.body.slug ? slugify(req.body.slug) : slugify(title),
    summary: req.body.summary || '',
    content: req.body.content || '',
    coverImage: req.body.coverImage || '',
    icon: req.body.icon || '',
    status: req.body.status === 'draft' ? 'draft' : 'published',
    order: Number(req.body.order) || items.length + 1,
    createdAt: ts,
    updatedAt: ts,
  };
  items.unshift(item);
  writeCollection('services', items);
  return res.status(201).json(item);
});

router.put('/:id', adminRequired, (req, res) => {
  const items = readCollection('services', []);
  const index = items.findIndex((s) => s.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Xidmət tapılmadı' });
  const existing = items[index];
  const title = (req.body.title || existing.title || '').trim();
  if (!title) return res.status(400).json({ error: 'Xidmətin adı tələb olunur' });
  const updated = {
    ...existing,
    title,
    slug: req.body.slug ? slugify(req.body.slug) : existing.slug || slugify(title),
    summary: req.body.summary !== undefined ? req.body.summary : existing.summary,
    content: req.body.content !== undefined ? req.body.content : existing.content,
    coverImage: req.body.coverImage !== undefined ? req.body.coverImage : existing.coverImage,
    icon: req.body.icon !== undefined ? req.body.icon : existing.icon,
    status: req.body.status === 'draft' ? 'draft' : req.body.status === 'published' ? 'published' : existing.status,
    order: req.body.order !== undefined ? Number(req.body.order) : existing.order,
    updatedAt: now(),
  };
  items[index] = updated;
  writeCollection('services', items);
  return res.json(updated);
});

router.delete('/:id', adminRequired, (req, res) => {
  const items = readCollection('services', []);
  const next = items.filter((s) => s.id !== req.params.id);
  if (next.length === items.length) return res.status(404).json({ error: 'Xidmət tapılmadı' });
  writeCollection('services', next);
  return res.status(204).send();
});

module.exports = router;
