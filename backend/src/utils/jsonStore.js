const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', '..', 'data');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function filePath(name) {
  return path.join(DATA_DIR, `${name}.json`);
}

function readCollection(name, fallback = []) {
  ensureDataDir();
  const file = filePath(name);
  if (!fs.existsSync(file)) {
    writeCollection(name, fallback);
    return Array.isArray(fallback) ? [...fallback] : { ...fallback };
  }
  const raw = fs.readFileSync(file, 'utf8');
  try {
    return JSON.parse(raw);
  } catch (err) {
    throw new Error(`Failed to parse ${name}.json: ${err.message}`);
  }
}

function writeCollection(name, data) {
  ensureDataDir();
  fs.writeFileSync(filePath(name), JSON.stringify(data, null, 2), 'utf8');
  return data;
}

module.exports = {
  DATA_DIR,
  readCollection,
  writeCollection,
};
