import React from "react";
import * as BooksAPI from "../BooksAPI";
import PropTypes from "prop-types";

class BookShelfChanger extends React.Component {
  state = {
    selectedCategory: this.props.book.shelf ? this.props.book.shelf : "none",
  };

  handleChange = (value) => {
    this.setState(() => ({
      selectedCategory: value,
    }));

    if (this.props.onUpdateShelf) {
      this.props.onUpdateShelf(this.props.book, value);
    }

    BooksAPI.update(this.props.book, value);
  };

  render() {
    return (
      <div className="book-shelf-changer">
        <select
          name="category"
          onChange={(e) => this.handleChange(e.target.value)}
          value={this.state.selectedCategory}
        >
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

BookShelfChanger.propTypes = {
  book: PropTypes.object.isRequired,
  onUpdateShelf: PropTypes.func.isRequired,
};

export default BookShelfChanger;
