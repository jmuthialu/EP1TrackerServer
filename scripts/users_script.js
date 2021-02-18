const bcrypt = require('bcryptjs')
const saltRounds = 10

async function hashUserPassword(userList) {
  const promiseArray = userList.map(async (user) => {
    const hashedPwd = await new Promise((resolve, reject) => {
      bcrypt.hash(user.password, saltRounds, function(err, hashedPassword) {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          resolve(hashedPassword)
        }
      })
    })
    user.password = hashedPwd
    return user
  })

  const usersWithHashedPwd = await Promise.all(promiseArray)
  return usersWithHashedPwd
}

module.exports = { hashUserPassword }