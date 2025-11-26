const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
  return total
}

const favouriteBlog = (blogs) => {
  if (blogs.length == 0 || !blogs) {
    return blogs
  }
  const likes = blogs.map(blog => blog.likes)
  console.log(likes)
  const fav = blogs[likes.indexOf(Math.max(...likes))]
  return fav
}


module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}

