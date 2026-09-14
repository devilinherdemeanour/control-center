const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { readCollection, writeCollection } = require('../utils/jsonStore');
const { now, hashPassword, verifyPassword } = require('../utils/helpers');
const { signToken, adminRequired } = require('../middleware/auth');

const router = express.Router();

function publicUser(user) {
  return {
    id: user.id,
    username: user.username,
    fullName: user.fullName || '',
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

router.post('/login', async (req, res) => {
  const username = (req.body.username || '').trim();
  const password = req.body.password || '';
  const users = readCollection('users', []);
  const user = users.find((u) => u.username === username && u.role === 'admin');
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return res.status(401).json({ error: 'İstifadəçi adı və ya şifrə yanlışdır' });
  }
  const token = signToken(user);
  return res.json({ token, user: publicUser(user) });
});

router.get('/me', adminRequired, (req, res) => {
  const users = readCollection('users', []);
  const user = users.find((u) => u.id === req.user.sub);
  if (!user) return res.status(404).json({ error: 'İstifadəçi tapılmadı' });
  return res.json(publicUser(user));
});

router.get('/', adminRequired, (req, res) => {
  const users = readCollection('users', []);
  res.json(users.map(publicUser));
});

router.post('/', adminRequired, async (req, res) => {
  const users = readCollection('users', []);
  const username = (req.body.username || '').trim();
  const password = req.body.password || '';
  const fullName = (req.body.fullName || '').trim();
  if (!username || !password) {
    return res.status(400).json({ error: 'İstifadəçi adı və şifrə tələb olunur' });
  }
  if (users.some((u) => u.username === username)) {
    return res.status(400).json({ error: 'Bu istifadəçi adı artıq mövcuddur' });
  }
  const ts = now();
  const user = {
    id: uuidv4(),
    username,
    passwordHash: await hashPassword(password),
    fullName,
    role: 'admin',
    createdAt: ts,
    updatedAt: ts,
  };
  users.unshift(user);
  writeCollection('users', users);
  return res.status(201).json(publicUser(user));
});

router.put('/:id', adminRequired, async (req, res) => {
  const users = readCollection('users', []);
  const index = users.findIndex((u) => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'İstifadəçi tapılmadı' });
  const existing = users[index];
  const username = (req.body.username || existing.username || '').trim();
  if (!username) return res.status(400).json({ error: 'İstifadəçi adı tələb olunur' });
  if (users.some((u) => u.username === username && u.id !== existing.id)) {
    return res.status(400).json({ error: 'Bu istifadəçi adı artıq mövcuddur' });
  }
  const updated = {
    ...existing,
    username,
    fullName: req.body.fullName !== undefined ? req.body.fullName : existing.fullName,
    role: 'admin',
    updatedAt: now(),
  };
  if (req.body.password) {
    updated.passwordHash = await hashPassword(req.body.password);
  }
  users[index] = updated;
  writeCollection('users', users);
  return res.json(publicUser(updated));
});

router.delete('/:id', adminRequired, (req, res) => {
  const users = readCollection('users', []);
  if (users.length <= 1) {
    return res.status(400).json({ error: 'Son admin istifadəçisini silmək olmaz' });
  }
  const next = users.filter((u) => u.id !== req.params.id);
  if (next.length === users.length) return res.status(404).json({ error: 'İstifadəçi tapılmadı' });
  writeCollection('users', next);
  return res.status(204).send();
});

module.exports = router;
