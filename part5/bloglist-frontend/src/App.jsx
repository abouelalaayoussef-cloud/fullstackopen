import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

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

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({
        title: newTitle,
        author: newAuthor,
        url: newUrl
      })
      setBlogs(blogs.concat(newBlog))
      setSuccessMessage(`a new blog ${newTitle} by ${newAuthor} added`)
      setTimeout(() => setSuccessMessage(null), 5000)
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
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

  const blogForm = () => (
    <form onSubmit={handleCreateBlog}>
      <h2>create new</h2>
      <div>
        title:
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </div>
      <div>
        author:
        <input
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
        />
      </div>
      <div>
        url:
        <input
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      {blogForm()}
      {blogs.map(blog =>
        <div key={blog.id}>
          {blog.title} {blog.author}
        </div>
      )}
    </div>
  )

  return (
    <div>
      {user === null
        ? loginForm()
        : blogList()
      }
    </div>
  )
}

export default App