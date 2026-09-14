const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { readCollection, writeCollection } = require('../utils/jsonStore');
const { now } = require('../utils/helpers');
const { adminRequired } = require('../middleware/auth');

const router = express.Router();

router.get('/', (req, res) => {
  const items = readCollection('lawyers', []);
  const list = req.query.all === '1' ? items : items.filter((l) => l.status === 'published');
  list.sort((a, b) => (a.order || 0) - (b.order || 0));
  res.json(list);
});

router.get('/:id', (req, res) => {
  const items = readCollection('lawyers', []);
  const item = items.find((l) => l.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Vəkil tapılmadı' });
  return res.json(item);
});

router.post('/', adminRequired, (req, res) => {
  const items = readCollection('lawyers', []);
  const firstName = (req.body.firstName || '').trim();
  const lastName = (req.body.lastName || '').trim();
  if (!firstName || !lastName) {
    return res.status(400).json({ error: 'Ad və soyad tələb olunur' });
  }
  const ts = now();
  const item = {
    id: uuidv4(),
    firstName,
    lastName,
    direction: req.body.direction || '',
    title: req.body.title || '',
    photo: req.body.photo || '',
    bio: req.body.bio || '',
    details: req.body.details || '',
    email: req.body.email || '',
    phone: req.body.phone || '',
    order: Number(req.body.order) || items.length + 1,
    status: req.body.status === 'draft' ? 'draft' : 'published',
    createdAt: ts,
    updatedAt: ts,
  };
  items.unshift(item);
  writeCollection('lawyers', items);
  return res.status(201).json(item);
});

router.put('/:id', adminRequired, (req, res) => {
  const items = readCollection('lawyers', []);
  const index = items.findIndex((l) => l.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Vəkil tapılmadı' });
  const existing = items[index];
  const firstName = (req.body.firstName || existing.firstName || '').trim();
  const lastName = (req.body.lastName || existing.lastName || '').trim();
  if (!firstName || !lastName) {
    return res.status(400).json({ error: 'Ad və soyad tələb olunur' });
  }
  const updated = {
    ...existing,
    firstName,
    lastName,
    direction: req.body.direction !== undefined ? req.body.direction : existing.direction,
    title: req.body.title !== undefined ? req.body.title : existing.title,
    photo: req.body.photo !== undefined ? req.body.photo : existing.photo,
    bio: req.body.bio !== undefined ? req.body.bio : existing.bio,
    details: req.body.details !== undefined ? req.body.details : existing.details,
    email: req.body.email !== undefined ? req.body.email : existing.email,
    phone: req.body.phone !== undefined ? req.body.phone : existing.phone,
    order: req.body.order !== undefined ? Number(req.body.order) : existing.order,
    status: req.body.status === 'draft' ? 'draft' : req.body.status === 'published' ? 'published' : existing.status,
    updatedAt: now(),
  };
  items[index] = updated;
  writeCollection('lawyers', items);
  return res.json(updated);
});

router.delete('/:id', adminRequired, (req, res) => {
  const items = readCollection('lawyers', []);
  const next = items.filter((l) => l.id !== req.params.id);
  if (next.length === items.length) return res.status(404).json({ error: 'Vəkil tapılmadı' });
  writeCollection('lawyers', next);
  return res.status(204).send();
});

module.exports = router;
