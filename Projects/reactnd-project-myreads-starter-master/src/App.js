import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import ListBooks from "./components/ListBooks";
import SearchBooks from "./components/SearchBooks";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount = () => {
    this.getAllBooks();
  };

  getAllBooks = () => {
    BooksAPI.getAll().then((books) =>
      this.setState(() => ({
        books: books,
      }))
    );
  };

  onUpdateShelf = (book, newShelf) => {
    book.shelf = newShelf;
    this.setState((prevState) => ({
      books: prevState.books.filter((b) => b.id !== book.id).concat(book),
    }));
  };

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks books={books} onUpdateShelf={this.onUpdateShelf} />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks books={books} onUpdateShelf={this.onUpdateShelf} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
