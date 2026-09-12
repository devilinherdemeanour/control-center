const express = require('express');
const { readCollection, writeCollection } = require('../utils/jsonStore');

const router = express.Router();

const defaultAbout = {
  headline: '',
  subheadline: '',
  body: '',
  mission: '',
  vision: '',
  teamIntro: '',
  updatedAt: null,
};

router.get('/', (req, res) => {
  const about = readCollection('about', defaultAbout);
  res.json(about);
});

router.put('/', (req, res) => {
  const existing = readCollection('about', defaultAbout);
  const updated = {
    ...existing,
    headline: req.body.headline !== undefined ? req.body.headline : existing.headline,
    subheadline: req.body.subheadline !== undefined ? req.body.subheadline : existing.subheadline,
    body: req.body.body !== undefined ? req.body.body : existing.body,
    mission: req.body.mission !== undefined ? req.body.mission : existing.mission,
    vision: req.body.vision !== undefined ? req.body.vision : existing.vision,
    teamIntro: req.body.teamIntro !== undefined ? req.body.teamIntro : existing.teamIntro,
    updatedAt: new Date().toISOString(),
  };
  writeCollection('about', updated);
  res.json(updated);
});

module.exports = router;
