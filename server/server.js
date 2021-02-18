const express = require('express');
const bodyParser = require('body-parser')
var { epallets } = require('../app_data/ep1_data.js')
var { usersList } = require('../app_data/users_list.js')
const { hashUserPassword } = require('../scripts/users_script.js')
const { authenticateUser } = require('./authentication.js')

const app = express();
app.use(bodyParser.json()) 
app.use(express.static('public'));

// Authenticate users with credentials provided. 
app.post('/users/authenticate', (req, res) => {
  console.log('POST /users/authenticate')
  console.log(`req.body: ${req.body}`)
  authenticateUser(usersList, req.body, res)
})

// List of EP1s
app.get('/epallets', (req, res) => {
  res.send(epallets)
}) 

// Update an EP1 (eg: for lock)
// POST: /epallets/104
// req.query:  { lockFlag: 'true' }
app.post('/epallets/:id', (req, res) => {
  console.log(`POST: /epallets/${req.params.id}`)  
  const palletId = req.params.id
  const lockFlag = req.query['lockFlag']

  // Conveting lockFlag from string to bool. It is coming as string
  // because query params can only be string.
  var lockStatus = false 
  if (lockFlag == 'true') {
    lockStatus = true
  }
  
  var resultFlag = false
  epallets.forEach(function(epallet, i) { 
    if (epallet.id == palletId) {      
      epallets[i]['isLocked'] = lockStatus
      resultFlag = true
      console.log(`isLocked changed to ${lockStatus} for id ${palletId} - resultFlag: ${resultFlag}`)
    } 
  })
  res.send({ status: resultFlag })
})

const port = process.env.port || 8080;
app.listen(port, function() {
  console.log(`EP1 Tracker started on port ${port}`);
  // encrypt user password in user_list.js
  (async() => {
    usersList = await hashUserPassword(usersList)
    console.log(usersList)
  })();

});