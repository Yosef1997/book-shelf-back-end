const { addBookShelfHandler, getAllBookShelfHandler, getBookShelfByIdHandler, editBookShelfByIdHandler, deleteBookShelfByIdHandler } = require('./handler')

const routes = [
  {
    method: 'POST',
    path: '/bookShelf',
    handler: addBookShelfHandler
  },
  {
    method: 'GET',
    path: '/bookShelf',
    handler: getAllBookShelfHandler
  },
  {
    method: 'GET',
    path: '/bookShelf/{id}',
    handler: getBookShelfByIdHandler
  },
  {
    method: 'PUT',
    path: '/bookShelf/{id}',
    handler: editBookShelfByIdHandler
  },
  {
    method: 'DELETE',
    path: '/bookShelf/{id}',
    handler: deleteBookShelfByIdHandler
  }
]

module.exports = routes
