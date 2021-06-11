const { nanoid } = require('nanoid')
const bookShelf = require('./bookShelf')

const addBookShelfHandler = (request, h) => {
  const { title, tags, body } = request.payload
  const id = nanoid(16)
  const createdAt = new Date().toISOString()
  const updatedAt = createdAt

  const newNote = {
    title, tags, body, id, createdAt, updatedAt
  }

  bookShelf.push(newNote)

  const isSuccess = bookShelf.filter((note) => note.id === id).length > 0

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id
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
  data: { bookShelf }
})

const getBookShelfByIdHandler = (request, h) => {
  const { id } = request.params

  const note = bookShelf.filter((note) => note.id === id)[0]

  if (note !== undefined) {
    return {
      status: 'success',
      data: { note }
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
  const { id } = request.params

  const { title, tags, body } = request.payload

  const updatedAt = new Date().toISOString()

  const index = bookShelf.findIndex((note) => note.id === id)

  if (index !== -1) {
    bookShelf[index] = {
      ...bookShelf[index],
      title,
      tags,
      body,
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

  const index = bookShelf.findIndex((note) => note.id === id)

  if (index !== -1) {
    bookShelf.splice(index, 1)
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
