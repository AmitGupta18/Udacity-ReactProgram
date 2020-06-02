import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";

function BookShelf(props) {
  const { books, onUpdateShelf } = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.bookShelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book book={book} onUpdateShelf={onUpdateShelf} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdateShelf: PropTypes.func.isRequired,
};
export default BookShelf;
