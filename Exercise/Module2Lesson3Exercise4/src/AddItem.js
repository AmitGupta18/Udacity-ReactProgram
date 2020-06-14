import React from "react";
import PropTypes from "prop-types";

class AddItem extends React.Component {
  static propTypes = {
    addItem: PropTypes.func.isRequired,
  };

  state = {
    value: "",
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  inputIsEmpty = () => {
    return this.state.value === "";
  };

  onAddItem = (event) => {
    this.props.addItem(event, this.state.value);
    this.setState({
      value: "",
    });
  };

  render() {
    return (
      <div>
        <h2>Shopping List</h2>
        <form onSubmit={this.onAddItem}>
          <input
            type="text"
            placeholder="Enter New Item"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button disabled={this.inputIsEmpty()}>Add</button>
        </form>
      </div>
    );
  }
}

export default AddItem;
