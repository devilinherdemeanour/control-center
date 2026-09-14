const path = require('path');
const express = require('express');
const cors = require('cors');

const blogsRouter = require('./routes/blogs');
const aboutRouter = require('./routes/about');
const pagesRouter = require('./routes/pages');
const settingsRouter = require('./routes/settings');
const dashboardRouter = require('./routes/dashboard');

const app = express();
const PORT = process.env.PORT || 4521;
const distPath = path.join(__dirname, '..', '..', 'frontend', 'dist', 'frontend');

app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (req, res) => {
  res.json({ ok: true, storage: 'json-files' });
});

app.use('/api/dashboard', dashboardRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/about', aboutRouter);
app.use('/api/pages', pagesRouter);
app.use('/api/settings', settingsRouter);

app.use(express.static(distPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return next();
  }
  return res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      next(err);
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Showcase app listening on http://127.0.0.1:${PORT}`);
});
