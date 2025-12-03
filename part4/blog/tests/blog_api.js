const { test, after, describe, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('assert')
const Blog = require('../models/blog')
const { requestLogger } = require('../utils/middleware')
const { title } = require('process')

const api = supertest(app)


const initialBlogs = [
  {
    "title": "My first blog",
    "author": "admin",
    "url": "http://localhost:3001",
    "likes": 1,
  },
  {
    "title": "HTML is easy",
    "author": "creator",
    "url": "http://localhost:3001",
    "likes": 10,
  }
]

beforeEach(async () => {
  await Blog.deleteMany()
  let blogObj = new Blog(initialBlogs[0])
  await blogObj.save()
  blogObj = new Blog(initialBlogs[1])
  await blogObj.save()
})

describe('testing get', async () => {
  test('blogs are retured as json', async () => {
    await api
      .get('/api/blog')
      .expect(200)
      .expect('Content-type', /application\/json/)
  })
  test('getting all blogs', async () => {
    const res = await api
      .get('/api/blog')
      .expect(200)
    assert.strictEqual(res.body.length, 2)
  })
  test('a specific blog is retured', async () => {
    const res = await api
      .get('/api/blog')
      .expect(200)
    const titles = res.body.map(e => e.title)
    assert(titles.includes('My first blog'))
  })
  test('unique identifier property', async () => {
    const res = await api
      .get('/api/blog')
      .expect(200)
    assert(Object.keys(res.body[0]).includes("id"))

  })
  test('likes property is missing', async () => {
    const res = await api
      .get('/api/blog')
      .expect(200)
    assert(Object.keys(res.body[0]).includes('likes'))
  })
})

describe('testing post', async () => {
  test('post creates a blog', async () => {
    const newBlog = initialBlogs[0]
    await api
      .post('/api/blog')
      .send(newBlog)
    const res = await api
      .get('/api/blog')
      .expect(200)
    assert.strictEqual(res.body.length, 3)
  })
  test('post has title and url', async () => {
    const newBlog = {
      "title": "My first blog",
      "url": "http://localhost:3001"
    }
    await api
      .post('/api/blog')
      .send(newBlog)
      .expect(200)
  })
  test('post has no url', async () => {
    const newblog = {
      "title": "my first blog",
      "likes": 10
    }
    await api
      .post('/api/blog')
      .send(newblog)
      .expect(400)
  })
  test('post has no title', async () => {
    const newblog = {
      "url": "http://localhost:3001",
      "likes": 10
    }
    await api
      .post('/api/blog')
      .send(newblog)
      .expect(400)
  })
  test('post has no title and url', async () => {
    const newblog = {
      "likes": 10
    }
    await api
      .post('/api/blog')
      .send(newblog)
      .expect(400)
  })
})

describe('delete and update', async () => {
  test("updating likes", async () => {
    const update = {
      likes: 10
    }
    const testBlog = await Blog.findOne()
    const id = testBlog.id
    await api
      .patch(`/api/blog/${id}`)
      .expect(200)
      .send(update)
    const updatedBlog = await Blog.findById(id)
    assert.strictEqual(updatedBlog.likes, 10)
  })
  test("updating title", async () => {
    const update = {
      title: "Hello world"
    }
    const testBlog = await Blog.findOne()
    const id = testBlog.id
    await api
      .patch(`/api/blog/${id}`)
      .expect(200)
      .send(update)
    const updatedBlog = await Blog.findById(id)
    assert.strictEqual(updatedBlog.title, "Hello world")
  })

  test("deleting one", async () => {
    const testBlog = await Blog.findOne()
    const id = testBlog.id
    await api
      .delete(`/api/blog/${id}`)
      .expect(200)
    const updatedBlogs = await Blog.find()
    assert.strictEqual(updatedBlogs.length, 1)
  })
  test("deleting non existing blog", async () => {
    const id = 123
    const res = await api
      .delete(`/api/blog/${id}`)
      .expect(400)
    const updatedBlogs = await Blog.find()
    assert.strictEqual(updatedBlogs.length, 2)
  })
})

after(async () => {
  await mongoose.connection.close()
})
