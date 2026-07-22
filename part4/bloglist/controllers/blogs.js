const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user' , {username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch(error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const { title, author, url, likes } = request.body

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { title, author, url, likes },
      { returnDocument:'after', runValidators: true, context: 'query' }
    )
    response.json(updatedBlog)
  } catch(error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const {title, author, url, likes} = request.body

  if(!title || !url) {
    return response.status(400).end()
  }

  try {
    if(!request.token) {
      return response.status(401).json({error: 'token invalid'})
    }

    const decodedToken = jwt.verify(request.token , config.SECRET)

    if(!decodedToken.id) {
      return response.status(401).json({error: 'token invalid'})
    }
    const user = request.user

    const blog = new Blog ({
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }

})

module.exports = blogsRouter