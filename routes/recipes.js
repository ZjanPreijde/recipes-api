// routes/recipes.js
const router = require('express').Router()
const { Recipe } = require('../models')

router
  // Index of recipes
  .get('/recipes', (req, res, next) => {
    Recipe.find()
      // Newest recipes first
      .sort({ createdAt: -1 })
      // Send the data in JSON format
      .then((recipes) => res.json(recipes))
      // Throw a 500 error if something goes wrong
      .catch((error) => next(error))
  })
  // Show 1 recipe
  .get('/recipes/:id', (req, res, next) => {
    const id = req.params.id

    Recipe.findById(id)
      .then( (recipe) => {
        if (!recipe) { return next() }
        res.json(recipe)
      })
      .catch((error) => next(error))
  })
  // Create recipe
  .post('/recipes', (req, res, next) => {
    let newRecipe = req.body

    Recipe.create(newRecipe)
      .then((recipe) => res.json(recipe))
      .catch((error) => next(error))
  })
  // Update recipe
  .put('/recipes/:id', (req, res, next) => {
    const id = req.params.id

    Recipe.findById(id)
      .then((recipe) => {
        if (!recipe) { return next() }

        const newData = req.body

        recipe.update(newData)
          .then((updatedRecipe) => {
            res.json(updatedRecipe)
          })
          .catch((error) => next(error))
      })
      .catch((error) => next(error))
  })

  // Partial update recipe
  // .patch

  // Destroy recipe
  .delete('/recipes/:id', (req, res, next) => {
    const id = req.params.id
    Recipe.findById(id)
      .then((recipe) => {
        if (!recipe) { return next() }
        recipe.remove()
          .then((removed) => {
             res.json(removed)
           })
      .catch((error) => next(error))
  })

module.exports = router
