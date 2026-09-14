const express = require('express');
const { readCollection, writeCollection } = require('../utils/jsonStore');
const { now } = require('../utils/helpers');
const { adminRequired } = require('../middleware/auth');

const router = express.Router();

const defaults = {
  headline: '',
  subheadline: '',
  address: '',
  phone: '',
  phoneSecondary: '',
  email: '',
  emailSecondary: '',
  workingHours: '',
  mapEmbedUrl: '',
  mapLat: '',
  mapLng: '',
  whatsapp: '',
  telegram: '',
  facebook: '',
  instagram: '',
  linkedin: '',
  extraNote: '',
  updatedAt: null,
};

router.get('/', (req, res) => {
  res.json(readCollection('contact', defaults));
});

router.put('/', adminRequired, (req, res) => {
  const existing = readCollection('contact', defaults);
  const updated = { ...existing };
  Object.keys(defaults).forEach((key) => {
    if (key === 'updatedAt') return;
    if (req.body[key] !== undefined) updated[key] = req.body[key];
  });
  updated.updatedAt = now();
  writeCollection('contact', updated);
  res.json(updated);
});

module.exports = router;
