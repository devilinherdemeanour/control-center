const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'aslan-ismayilov-admin-dev-secret';

function signToken(user) {
  return jwt.sign(
    { sub: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function authRequired(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: 'Giriş tələb olunur' });
  }
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token etibarsızdır' });
  }
}

function adminRequired(req, res, next) {
  authRequired(req, res, () => {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ error: 'Yalnız admin icazəlidir' });
    }
    return next();
  });
}

module.exports = {
  JWT_SECRET,
  signToken,
  authRequired,
  adminRequired,
};
