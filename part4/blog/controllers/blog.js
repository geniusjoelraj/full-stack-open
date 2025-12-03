const blogRouter = require('express').Router()
const { default: mongoose } = require('mongoose')
const Blog = require('../models/blog')
const { json } = require('express')

blogRouter.get('/', async (req, res, next) => {
  try {
    const data = await Blog.find({})
    res.json(data)
  } catch (err) {
    next(err)
  }
})

blogRouter.get('/:id', async (req, res, next) => {
  const _id = req.params.id
  const blog = await Blog.findById({ _id })
  try {
    if (blog) {
      res.json(blog)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    next(err)
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
  try {
    const savedBlog = await newBlog.save()
    res.json(savedBlog)
  } catch (err) {
    next(err)
  }
})

blogRouter.patch('/:id', async (req, res, next) => {
  const _id = req.params.id
  const body = req.body
  try {
    const updated = await Blog.findOneAndUpdate({ _id }, body);
    res.json(updated)
  } catch (err) {
    next(err)
  }
})

blogRouter.delete('/:id', async (req, res, next) => {
  const _id = req.params.id
  try {
    const deleted = await Blog.findOneAndDelete({ _id });
    if (!deleted) {
      res.status(404)
    } else {
      res.json(deleted)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = blogRouter

