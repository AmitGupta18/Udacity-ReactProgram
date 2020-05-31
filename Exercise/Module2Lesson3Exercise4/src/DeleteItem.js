import React from "react";
import PropTypes from "prop-types";

class DeleteItem extends React.Component {
  static propTypes = {
    deleteItem: PropTypes.func.isRequired,
    numItems: PropTypes.number.isRequired,
  };

  noItemsFound = () => {
    return this.props.numItems === 0;
  };

  render() {
    return (
      <button
        onClick={() => this.props.deleteItem()}
        disabled={this.noItemsFound()}
      >
        Delete Last Item
      </button>
    );
  }
}

export default DeleteItem;
