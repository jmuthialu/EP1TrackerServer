const express = require('express');
const { epallets } = require('../app_data/data.js')

const app = express();
app.use(express.static('public'));

// List of EP1s
app.get('/epallets', (req, res) => {
  res.send(epallets)
})

const port = process.env.port || 8080;
app.listen(port, function() {
  console.log(`EP1 Tracker started on port ${port}`);
});