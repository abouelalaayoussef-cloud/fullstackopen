import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, expect } from 'vitest'
import Blog from './Blog'

const blog = {
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  user: {
    username: 'testuser',
    name: 'Test User'
  }
}

const mockUser = {
  username: 'testuser',
  name: 'Test User'
}

test('renders title and author but not url or likes by default', () => {
  render(
    <Blog
      blog={blog}
      handleLike={() => {}}
      handleDelete={() => {}}
      user={mockUser}
    />
  )

  expect(screen.getByText('React patterns Michael Chan')).toBeDefined()
  expect(screen.queryByText('https://reactpatterns.com/')).toBeNull()
  expect(screen.queryByText('likes 7')).toBeNull()
})