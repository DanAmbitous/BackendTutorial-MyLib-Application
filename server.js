if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const PORT = process.env.PORT || 3572
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', () => console.log(error))
db.once('open', () => console.log(`DB connected!`))

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

app.set('view engine', 'ejs')

app.set('views', __dirname + '/views')

app.set('layout', 'layouts/layout')

app.use(expressLayouts)

app.use(express.static('public'))

app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

app.use('/', indexRouter)
app.use('/authors', authorRouter)

app.listen(PORT, () => console.log(`Running server on ${PORT}`))