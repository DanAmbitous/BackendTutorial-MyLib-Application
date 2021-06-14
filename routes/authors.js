const express = require('express')
const router = express.Router()
const Author = require('../models/authorPrototype')

//Get all authors
router.get('/', async (req, res) => {
  try {
    const authors = await Author.find({})

    res.render('authors/index', {authors: authors})
  } catch {
    res.redirect('/')
  }
})

//Get new author 
router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() })
})

//Create author
router.post('/', async (req, res) => {
  const author = new Author({
    name: req.body.name
  })

  try {
    const newAuthor = await author.save()
    // res.redirect(`authors/${newAuthor.id}`)
    res.redirect('authors')
  } catch (error) {
    res.render('authors/new', {
      author: author,
      errorMessage: 'Error creating the author'
    })
  }
})

router.delete('/', async (req, res) => {
  const allAuthors = await Author.find()

  if (allAuthors.length === 0) {
    res.send("There aren't any entries of authors to delete")
  } else {
    await Author.deleteMany()
    res.send("YETUS DELETUS")
  }

})

module.exports = router