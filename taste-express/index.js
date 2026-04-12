const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public/
app.use(express.static('public'));

// Root route — explicit fallback (redundant with static but intentional)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 handler — serve index.html for SPA-style routing
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.stack);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
  });
});

app.listen(PORT, () => {
  console.log(`\n  ◆ Dex Portfolio // System OS`);
  console.log(`  → Running at http://localhost:${PORT}`);
  console.log(`  → Environment: ${process.env.NODE_ENV || 'development'}\n`);
});