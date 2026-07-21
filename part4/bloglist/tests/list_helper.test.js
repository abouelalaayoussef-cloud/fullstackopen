const { test, describe } = require('@jest/globals')
const { expect } = require('@jest/globals')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5
    }
  ]

  const listWithManyBlogs = [
    { title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7 },
    { title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf', likes: 5 },
    { title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'https://cs.helsinki.fi/u/luodonro/pub/1982/p135-dijkstra.pdf', likes: 12 },
    { title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html', likes: 10 },
    { title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/11/16/TDD_Harms_Architecture.html', likes: 0 },
    { title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2 }
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has many blogs equals the sum of likes', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(36)
  })

  test('when list is empty equals zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
})

describe('favorite blog', () => {
  const listWithManyBlogs = [
    { title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7 },
    { title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf', likes: 5 },
    { title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'https://cs.helsinki.fi/u/luodonro/pub/1982/p135-dijkstra.pdf', likes: 12 },
    { title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html', likes: 10 },
    { title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/11/16/TDD_Harms_Architecture.html', likes: 0 },
    { title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2 }
  ]

  test('when list has many blogs returns the one with most likes', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'https://cs.helsinki.fi/u/luodonro/pub/1982/p135-dijkstra.pdf',
      likes: 12
    })
  })

  test('when list is empty returns null', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBeNull()
  })

  test('when list has one blog returns that blog', () => {
    const result = listHelper.favoriteBlog([
      { title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7 }
    ])
    expect(result).toEqual({
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7
    })
  })
})

