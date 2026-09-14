const bcrypt = require('bcryptjs');

function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9əöğüşçıİ]+/gi, '-')
    .replace(/(^-|-$)/g, '');
}

function now() {
  return new Date().toISOString();
}

async function hashPassword(password) {
  return bcrypt.hash(String(password), 10);
}

async function verifyPassword(password, hash) {
  return bcrypt.compare(String(password), hash);
}

module.exports = {
  slugify,
  now,
  hashPassword,
  verifyPassword,
};
