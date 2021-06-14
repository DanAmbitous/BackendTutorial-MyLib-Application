if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const PORT = process.env.PORT || 3572
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', () => console.log(error))
db.once('open', () => console.log(`DB connected!`))

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')

app.set('views', __dirname + '/views')

app.set('layout', 'layouts/layout')

app.use(expressLayouts)

app.use(express.static('public'))

app.use('/', indexRouter)

app.listen(PORT, () => console.log(`Running server on ${PORT}`))