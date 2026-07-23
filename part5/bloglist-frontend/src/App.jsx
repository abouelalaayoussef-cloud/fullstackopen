import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleLike = async (blog) => {
  const updatedBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1,
    user: blog.user?.id || blog.user
  }

  try {
    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    setBlogs(blogs.map(b => b.id !== blog.id ? b : returnedBlog))
  } catch (error) {
    setErrorMessage('Error liking blog')
    setTimeout(() => setErrorMessage(null), 5000)
  }
}

  const handleCreateBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setSuccessMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => setSuccessMessage(null), 5000)
    } catch (error) {
      setErrorMessage('Error creating blog')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div>
        username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  return (
    <div>
      {user === null
        ? loginForm()
        : <div>
            <h2>blogs</h2>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <p>
              {user.name} logged in
              <button onClick={handleLogout}>logout</button>
            </p>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm createBlog={handleCreateBlog} />
            </Togglable>
            {blogs
            .sort((a,b) => b.likes - a.likes)
            .map(blog =>
              <Blog key={blog.id} blog={blog} handleLike={handleLike} />
)}
          </div>
      }
    </div>
  )
}

export default App