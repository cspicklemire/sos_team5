// Import database
const knex = require('./../db')
// Retrieve all users
exports.usersAll = async (req, res) => {
  // Get all users from database
  knex
    .select('*') // select all records
    .from('Users') // from 'users' table
    .then(userData => {
      // Send users extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving users: ${err}` })
    })
}
// Create new user
exports.usersCreate = async (req, res) => {
  // Add new user to database
  knex('Users')
    .insert({ // insert new record, a user
      'username': req.body.username,
      'gmail': req.body.gmail,
      'password': req.body.password,
      'first_name': req.body.first_name,
      'last_name': req.body.last_name,
    })
    .then(() => {
      // Send a success message in response
      res.json({ message: `User \'${req.body.username}\' by ${req.body.first_name}  ${req.body.last_name} created.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error creating ${req.body.username} user: ${err}` })
    })
}
// Remove specific user
exports.usersDelete = async (req, res) => {
  // Find specific user in the database and remove it
  knex('Users')
    .where('username', req.body.username) // find correct record based on username
    .del() // delete the record
    .then(() => {
      // Send a success message in response
      res.json({ message: `User ${req.body.username} deleted.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error deleting ${req.body.username}: ${err}` })
    })
}
// Remove all users on the list
exports.usersReset = async (req, res) => {
  // Remove all users from database
  knex
    .select('*') // select all records
    .from('Users') // from 'Users' table
    .truncate() // remove the selection
    .then(() => {
      // Send a success message in response
      res.json({ message: 'User list cleared.' })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error resetting user list: ${err}.` })
    })
}