import React from "react";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";
import BookShelfModel from "../models/BookShelfModel";
import PropTypes from "prop-types";

function ListBooks(props) {
  const { books, onUpdateShelf } = props;

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {BookShelfModel.map((shelf) => (
            <BookShelf
              key={shelf.filterValue}
              bookShelfTitle={shelf.shelfName}
              books={books.filter((book) => book.shelf === shelf.filterValue)}
              onUpdateShelf={onUpdateShelf}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search"> Add a book</Link>
      </div>
    </div>
  );
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdateShelf: PropTypes.func.isRequired,
};

export default ListBooks;
