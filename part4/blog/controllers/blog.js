const blogRouter = require('express').Router()
const { default: mongoose } = require('mongoose')
const BlogSchema = require('../models/blog')


const Blog = mongoose.model('Blog', BlogSchema)

blogRouter.get('/', (req, res) => {
  Blog.find({})
    .then(data => res.json(data))
})

blogRouter.get('/:id', (req, res) => {
  const id = req.params.id
  Blog.findById({ id })
    .then(blog => {
      if (blog) {
        res.json(blog)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))
})

blogRouter.post('/', (req, res, next) => {
  const body = req.body

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

  newBlog.save()
    .then(savedBlog => {
      res.json(savedBlog)
    })
    .catch(err => next(err))
})

module.exports = blogRouter

