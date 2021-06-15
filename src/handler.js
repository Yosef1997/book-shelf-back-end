const { nanoid } = require('nanoid')
const bookShelf = require('./bookShelf')

const addBookShelfHandler = (request, h) => {
  const id = nanoid(16)

  const {
    name,
    year = parseInt(),
    author,
    summary,
    publisher,
    pageCount = parseInt(),
    readPage = parseInt(),
    reading
  } = request.payload

  if (name === undefined || name === null) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }

  let finished

  if (pageCount === readPage) {
    finished = true
  } else if(readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response 
  } else {
    finished = false
  }

  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  const newbook = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
  }

  bookShelf.push(newbook)

  const isSuccess = bookShelf.filter((book) => book.id === id).length > 0

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    })
    response.code(201)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan'
  })
  response.code(500)
  return response
}

const getAllBookShelfHandler = () => {
  if (bookShelf !== []) {
    const books = bookShelf.map((book) => {
      return ({
        id: book.id,
        name: book.name,
        publisher: book.publisher
      })
    })
    return ({
      status: 'success',
      data: { books }
    })
  }
}
const getBookShelfByIdHandler = (request, h) => {
  const { bookId } = request.params

  const book = bookShelf.filter((book) => book.id === bookId)[0]

  if (book !== undefined) {
    return {
      status: 'success',
      data: { book }
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  })
  response.code(404)
  return response
}

const editBookShelfByIdHandler = (request, h) => {
  const { bookId } = request.params

  const {
    name,
    year = parseInt(),
    author,
    summary,
    publisher,
    pageCount = parseInt(),
    readPage = parseInt(),
    reading
  } = request.payload

  if (name === undefined || name === null) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }

  if (pageCount < readPage) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }

  if (pageCount === readPage) {
    finished = true
  } else {
    finished = false
  }

  const updatedAt = new Date().toISOString()

  const index = bookShelf.findIndex((book) => book.id === bookId)

  if (index !== -1) {
    bookShelf[index] = {
      ...bookShelf[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt
    }
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    })
    response.code(200)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

const deleteBookShelfByIdHandler = (request, h) => {
  const { bookId } = request.params

  const index = bookShelf.findIndex((book) => book.id === bookId)

  if (index !== -1) {
    bookShelf.splice(index, 1)
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

module.exports = { addBookShelfHandler, getAllBookShelfHandler, getBookShelfByIdHandler, editBookShelfByIdHandler, deleteBookShelfByIdHandler }
