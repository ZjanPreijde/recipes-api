// routes/users.js
const router = require('express').Router()
const { User } = require('../models')

router
  // Index of users
  .get('/users', (req, res, next) => {
    User.find()
      // Newest users first
      .sort({ createdAt: -1 })
      // Send the data in JSON format
      .then((users) => res.json(users))
      // Throw a 500 error if something goes wrong
      .catch((error) => next(error))
  })
  // Show 1 user
  .get('/users/:id', (req, res, next) => {
    const id = req.params.id

    User.findById(id)
      .then( (user) => {
        if (!user) { return next() }
        res.json({name: user.name, email: user.email, createdAt: user.createdAt, updatedAt: user.updatedAt})

      })
      .catch((error) => next(error))
  })
  .post('/users', (req, res, next) => {
    User.register(new User({name: req.body.name, email: req.body.email}), req.body.password, (err, user) => {
      if (err) {
        err.status = 422
        return next(err)
      }

      res.status(201).send(user)
    })
  })
module.exports = router
