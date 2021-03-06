const bodyParser = require('body-parser')
const express    = require('express')

const passport   = require('./config/auth')
const { recipes, users, sessions } = require('./routes')

const port = process.env.PORT || 3030

let app = express()
app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(passport.initialize())

  // Our recipes routes
  .use(recipes, users,sessions)
  // Our users routes
  // .use(users)

  // catch 404 and forward to error handler
  .use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  // final error handler
  .use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
      message: err.message,
      error: app.get('env') === 'development' ? err : {}
    })
  })

  .listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  })
