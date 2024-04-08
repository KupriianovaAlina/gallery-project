const express = require('express');
const cors = require('cors');

const { featureFlags } = require('./config.js');

const app = express();
const port = 3001;
app.use(cors());

app.get('/api/feature-flags', (req, res) => {
  res.json(featureFlags);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
