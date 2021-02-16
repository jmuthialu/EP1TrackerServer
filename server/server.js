const express = require('express');

const epallets = 
  [
    {
      id: 100, 
      model: 'EP1-100x', 
      status: 'Moving', 
      imageName: 'pallet',
      coordinate: {
        latitude: 33.753746,
        longitude: -84.386330
      }
    },
    {
      id: 101, 
      model: 'EP1-100x', 
      status: 'Moving', 
      imageName: 'pallet',
      coordinate: {
        latitude: 33.743746,
        longitude: -84.396330
      }
    },
    {
      id: 102, 
      model: 'EP1-100x', 
      status: 'Stopped', 
      imageName: 'pallet',
      coordinate: {
        latitude: 33.763746,
        longitude: -84.376330
      }
    },
  ];

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