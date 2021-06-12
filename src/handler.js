const { nanoid } = require('nanoid')
const books = require('./bookShelf')

const addBookShelfHandler = (request, h) => {
  const id = nanoid(16)
  
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
  
  if(name === undefined || name === null){
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }

  let finished 
  
  if(pageCount === readPage){
    finished = true
  } else {
    finished = false
  }
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  const newbook = {
    id, name, year, author, summary, publisher, pageCount, readPage,finished, reading, insertedAt, updatedAt
  }

  books.push(newbook)

  const isSuccess = books.filter((book) => book.id === id).length > 0

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
    message: 'Catatan gagal ditambahkan'
  })
  response.code(500)
  return response
}

const getAllBookShelfHandler = () => ({
  status: 'success',
  data:  {books}
})

const getBookShelfByIdHandler = (request, h) => {
  const { bookId } = request.params
  
  const book = books.filter((book) => book.id === bookId)[0]

  if (book !== undefined) {
    return {
      status: 'success',
      data: { book }
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan'
  })
  response.code(404)
  return response
}

const editBookShelfByIdHandler = (request, h) => {
  const { bookId } = request.params

  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

  if(name === undefined || name === null){
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }

  if(pageCount < readPage){
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }
  
  if(pageCount === readPage){
    finished = true
  } else {
    finished = false
  }

  const updatedAt = new Date().toISOString()

  const index = books.findIndex((book) => book.id === bookId)

  if (index !== -1) {
    books[index] = {
      ...books[index],
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
      message: 'Catatan berhasil diperbarui'
    })
    response.code(200)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

const deleteBookShelfByIdHandler = (request, h) => {
  const { id } = request.params

  const index = books.findIndex((book) => book.id === id)

  if (index !== -1) {
    books.splice(index, 1)
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

module.exports = { addBookShelfHandler, getAllBookShelfHandler, getBookShelfByIdHandler, editBookShelfByIdHandler, deleteBookShelfByIdHandler }
