const { test, after, describe, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('assert')
const Blog = require('../models/blog')

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
  // test('blogs are retured as json', async () => {
  //   await api
  //     .get('/api/blog')
  //     .expect(200)
  //     .expect('Content-type', /application\/json/)
  // })
  // test('getting all blogs', async () => {
  //   const res = await api
  //     .get('/api/blog')
  //     .expect(200)
  //   assert.strictEqual(res.body.length, 2)
  // })
  // test('a specific blog is retured', async () => {
  //   const res = await api
  //     .get('/api/blog')
  //     .expect(200)
  //   const titles = res.body.map(e => e.title)
  //   assert(titles.includes('My first blog'))
  // })
  // test('unique identifier property', async () => {
  //   const res = await api
  //     .get('/api/blog')
  //     .expect(200)
  //   assert(Object.keys(res.body[0]).includes("id"))
  //
  // })
})

describe('testing post', async () => {
  test('post creates a blog', async () => {
    const newBlog = new Blog({
      "title": "test blog",
      "author": "admin",
      "url": "http://localhost:3001",
      "likes": 1,
    })
    await api
      .post('/api/blog')
      .send(newBlog)
    const res = await api
      .get('/api/blog')
      .expect(200)
    assert(res._body.length, 3)
  })
})

after(async () => {
  await mongoose.connection.close()
})
