import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "../BooksAPI";
import PropTypes from "prop-types";

class SearchBooks extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired,
  };

  state = {
    searchedBooks: [],
  };

  updateQuery = (query) => {
    BooksAPI.search(query).then((searchedBooks) => {
      let updatedSearchedBooks = [];
      if (searchedBooks instanceof Array) {
        updatedSearchedBooks = searchedBooks.map(
          (searchedBook) =>
            this.props.books.find((book) => book.id === searchedBook.id) ||
            searchedBook
        );
      }
      this.setState(() => ({
        searchedBooks: updatedSearchedBooks,
      }));
    });
  };

  render() {
    const { searchedBooks } = this.state;
    const { onUpdateShelf } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              name="searchTerm"
              placeholder="Search by title or author"
              onChange={(e) => {
                this.updateQuery(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="search-books-results">
          <ol className="books-grid">
            {searchedBooks.map((book) => (
              <li key={book.id}>
                <Book book={book} onUpdateShelf={onUpdateShelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
