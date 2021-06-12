const { addBookShelfHandler, getAllBookShelfHandler, getBookShelfByIdHandler, editBookShelfByIdHandler, deleteBookShelfByIdHandler } = require('./handler')

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookShelfHandler
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBookShelfHandler
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookShelfByIdHandler
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBookShelfByIdHandler
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookShelfByIdHandler
  }
]

module.exports = routes
