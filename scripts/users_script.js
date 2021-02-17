const bcrypt = require('bcryptjs')
const saltRounds = 10

// await will not work within closure so add another async
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
  // console.log(usersWithHashedPwd)
  return usersWithHashedPwd
}


// hashUserPassword(userList)

module.exports = { hashUserPassword }