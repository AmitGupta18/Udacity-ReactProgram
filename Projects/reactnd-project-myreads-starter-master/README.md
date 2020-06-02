# MyReads Project

This project will let you search for books and add them in the shelf. There are three shelves (`Currently Reading`, `Want To Read` and `Read`) on the main page and each shelf contains the books on the basis of their read status.

# Installation:

- install all project dependencies with `npm install`

# Launch:

- start the development server with `npm start`

## Backend Server

[`BooksAPI.js`](src/BooksAPI.js) contains the methods to perform necessary operations on the backend:

- [`getAll`](#getall)
- [`update`](#update)
- [`search`](#search)

## Important

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.
