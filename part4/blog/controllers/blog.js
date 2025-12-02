const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res) => {
  const data = await Blog.find({})
  res.json(data)
})

blogRouter.get('/:id', async (req, res, next) => {
  const id = req.params.id
  const blog = await Blog.findById({ id })
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

blogRouter.post('/', async (req, res, next) => {
  const body = req.body
  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })
  const savedBlog = await newBlog.save()
  res.json(savedBlog)
})

module.exports = blogRouter

