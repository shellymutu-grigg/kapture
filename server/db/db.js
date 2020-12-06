// Create database side of api functions
const connection = require('./connection')
const { generateHash } = require('authenticare/server')

module.exports = {
  getUsers,
  createUser,
  userExists,
  getUserByName
}

// Create getUser function for api on server/database side
function getUsers (db = connection) {
  return db('users').select()
}

// Create createUser function for api on server/database side
function createUser (user, db = connection) {
  return userExists(user.username, db)
    .then(exists => {
      if (exists) {
        throw new Error('Bird already in flock')
      }
      return false
    })
    .then(() => generateHash(user.password))
    .then(passwordHash => {
      return db('users').insert({
        username: user.username,
        hash: passwordHash,
        is_admin: false
      })
    })
}

// Create userExists function to see if user aleady exists
function userExists (username, db = connection) {
  return db('users')
    .count('id as n')
    .where('username', username)
    .then((count) => {
      return count[0].n > 0
    })
}

function getUserByName (username, db = connection) {
  return db('users')
    .select('username', 'is_admin as isAdmin', 'id', 'hash')
    .where('username', username)
    .first()
}

// Test to be added back in when authenticare working
// txest('createUser creates a new user', () => {
//     const user = {
//       email: 'abc@gmail.com',
//       password: '12345'
//     }
//     return users.createUser(user, testDb)
//       .then((users) => {
//         expect(user.email).toBe('abc@gmail.com')
//         return null
//       })
//   })

// Create addObjects function for api on server/database side
// function addObject (newObject, db = connection) {
//   return db('object').insert(newObject)
// }

// // Create getObject function for api on server/database side
// function getObject (id, db = connection) {
//   return db('object').where('object.id', id).select('id', 'name', 'description')
// }

// // Create updateObject function for api on server/database side
// function updateObject (id, update, db = connection) {
//   return db('object').where('object.id', id).update(update)
// }

// // Create deleteObjectById function for api on server/database side
// function deleteObjectById(id, db = connection) {
//   console.log("db.js deleteObject:", id)
//   return db('object').where('object.id', id).delete()
// }
