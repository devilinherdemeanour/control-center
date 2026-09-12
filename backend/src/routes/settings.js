const express = require('express');
const { readCollection, writeCollection } = require('../utils/jsonStore');

const router = express.Router();

const defaultSettings = {
  siteName: '',
  tagline: '',
  logoUrl: '',
  primaryColor: '#1f4b3a',
  contactEmail: '',
  social: {
    twitter: '',
    linkedin: '',
    github: '',
  },
  updatedAt: null,
};

router.get('/', (req, res) => {
  res.json(readCollection('settings', defaultSettings));
});

router.put('/', (req, res) => {
  const existing = readCollection('settings', defaultSettings);
  const updated = {
    ...existing,
    siteName: req.body.siteName !== undefined ? req.body.siteName : existing.siteName,
    tagline: req.body.tagline !== undefined ? req.body.tagline : existing.tagline,
    logoUrl: req.body.logoUrl !== undefined ? req.body.logoUrl : existing.logoUrl,
    primaryColor: req.body.primaryColor !== undefined ? req.body.primaryColor : existing.primaryColor,
    contactEmail: req.body.contactEmail !== undefined ? req.body.contactEmail : existing.contactEmail,
    social: {
      twitter: req.body.social?.twitter !== undefined ? req.body.social.twitter : existing.social?.twitter || '',
      linkedin: req.body.social?.linkedin !== undefined ? req.body.social.linkedin : existing.social?.linkedin || '',
      github: req.body.social?.github !== undefined ? req.body.social.github : existing.social?.github || '',
    },
    updatedAt: new Date().toISOString(),
  };
  writeCollection('settings', updated);
  res.json(updated);
});

module.exports = router;
