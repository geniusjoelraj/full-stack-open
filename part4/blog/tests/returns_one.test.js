const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const mockBlogs = require('../utils/mock_blogs')

describe('returns one', () => {
  test('dummy blog returns one', () => {
    const blogs = []

    const res = listHelper.dummy(blogs)
    assert.strictEqual(res, 1)
  })
})

describe('total like', () => {
  test('likes of non zero length blogs', () => {
    const blogs = mockBlogs.blogs
    assert.strictEqual(listHelper.totalLikes(blogs), 36)
  })
  test('likes of empty blogs in zero', () => {
    const blogs = []
    assert.strictEqual(listHelper.totalLikes(blogs), 0)
  })
  test('likes of a array of one blog is equal to that', () => {
    const blogs = [mockBlogs.blogs[0]]
    assert.strictEqual(listHelper.totalLikes(blogs), 7)
  })
})

describe('favourites blog', () => {
  test('likes of a no blogs is zero', () => {
    const blogs = []
    assert.strictEqual(listHelper.favouriteBlog(blogs), blogs)
  })
  test('likes of non empty list', () => {
    const blogs = mockBlogs.blogs
    assert.strictEqual(listHelper.favouriteBlog(blogs), blogs[2])
  })
  test('likes of single blog', () => {
    const blogs = [mockBlogs.blogs[0]]
    assert.strictEqual(listHelper.favouriteBlog(blogs), blogs[0])
  })
})
