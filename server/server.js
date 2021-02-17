const express = require('express');
const bodyParser = require('body-parser')
const { epallets } = require('../app_data/ep1_data.js')
var { usersList } = require('../app_data/users_list.js')
const { hashUserPassword } = require('../scripts/users_script.js')
const { authenticateUser } = require('./authentication.js')

const app = express();
app.use(bodyParser.json()) // Without this req.body will be undefined
app.use(express.static('public'));

// Called when user logs in with credentials
app.post('/users/authenticate', (req, res) => {
  console.log('POST /users/authenticate')
  console.log(`req.body: ${req.body}`)
  authenticateUser(usersList, req.body, res)
})

// List of EP1s
app.get('/epallets', (req, res) => {
  res.send(epallets)
}) 

const port = process.env.port || 8080;
app.listen(port, function() {
  console.log(`EP1 Tracker started on port ${port}`);
  // bcrypt user password
  (async() => {
    usersList = await hashUserPassword(usersList)
    console.log(usersList)
  })();

});