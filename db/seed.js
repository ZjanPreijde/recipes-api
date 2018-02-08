// db/seed.js
const request = require('superagent')
const user    = require('./fixtures/user.json')
const recipes = require('./fixtures/recipes.json')

const createUrl = (path) => {
  return `${process.env.HOST || `http://localhost:${process.env.PORT || 3030}`}${path}`
}
