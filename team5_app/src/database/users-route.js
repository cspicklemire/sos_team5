// Import express
const express = require('express')
// Import Users-controller
const userRoutes = require('./../users-controller.js')
// Create router
const router = express.Router()
// Add route for GET request to retrieve all User
// In server.js, Users route is specified as '/Users'
// this means that '/all' translates to '/Users/all'
router.get('/all', userRoutes.usersAll)
// Add route for POST request to create new User
// In server.js, Users route is specified as '/Users'
// this means that '/create' translates to '/Users/create'
router.post('/create', userRoutes.usersCreate)
// Add route for PUT request to delete specific User
// In server.js, Users route is specified as '/Users'
// this means that '/delete' translates to '/Users/delete'
router.put('/delete', userRoutes.usersDelete)
// Add route for PUT request to reset bookshelf list
// In server.js, Users route is specified as '/Users'
// this means that '/reset' translates to '/Users/reset'
router.put('/reset', userRoutes.usersReset)
// Export router
module.exports = router