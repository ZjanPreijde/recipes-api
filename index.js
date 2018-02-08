const express = require('express')
const { Recipe } = require('./models')

const PORT = process.env.PORT || 3030

let app = express()

app.get('/recipes', (req, res, next) => {
  Recipe.find()
    // Newest recipes first
    .sort({ createdAt: -1 })
    // Send the data in JSON format
    .then((recipes) => res.json(recipes))
    // Forward any errors to error handler
    .catch((error) => next(error))
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
