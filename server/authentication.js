const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// TODO:- No secrets here. Move to container.
const jwtSecret = 'gmsecret'
const jwtTokenCookieName = 'gmtoken'

async function authenticateUser(usersList, signingUser, res) {
  const hashedUser = usersList.filter( user => user.emailId == signingUser.emailId)  
  const firstHashedUser = hashedUser[0]  

  if (firstHashedUser) {
    var result = bcrypt.compareSync(signingUser.password, firstHashedUser.password)
    if (result) {
        console.log("Password correct..generating token");
        const payload = { emailId: signingUser.emailId } // payload should be an object
        const token = jwt.sign(payload, jwtSecret, {
          expiresIn: '1h'
        })
        // const tokenPayload = { tokenkey: token}
        // console.log(tokenPayload)
        const { password, ...newUserObj } = firstHashedUser
        newUserObj.authToken = token
        console.log([newUserObj])
        res.json([newUserObj])
    } else {
        console.log("User failed authentication")
        res.status(401).send("User failed authentication")
    }
  } else {
    // res.send('No user found')
    console.log('no user')
    res.status(401).send("No user found in the users list")
  }
}

// req.cookies: {jwtToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoiYSIsImlhdCI6MTU3MjMwMTI5OSwiZXhwIjoxNTcy
//MzA0ODk5fQ.85C6wvr-YMTZFFLwGx32X4Q3DZTDlEKw1YRZiw3-Xw0"}

function checkToken(req, res) {
  const token = 
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.jwtToken

  if (!token) {
    res.status(401).send('Unauthoized access')
  } else {
    jwt.verify(token, jwtSecret, function(err) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid Token')
      } else {
        res.status(200).send(null)
      }
    })
  }
}

// test function to check if authentication() is working as intended
async function testAuth(usersList) {
    const signUser = { 
        emailId: 'job@gm.com',
        password: 'job'
    }
    const token = await authenticateUser(usersList, signUser)
    return token
}

module.exports = { authenticateUser, checkToken, testAuth }