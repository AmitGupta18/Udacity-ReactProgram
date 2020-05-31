import React from "react";
import PropTypes from "prop-types";

class AddUser extends React.Component {
  static propTypes = {
    addUser: PropTypes.func.isRequired,
    userNames: PropTypes.array.isRequired,
  };

  state = {
    firstName: "",
    lastName: "",
    userName: "",
    userAlreadyExists: false,
  };

  validateAndAddUser = (event) => {
    event.preventDefault();
    if (
      this.props.userNames.some((userName) => userName === this.state.userName)
    ) {
      this.setState({
        userAlreadyExists: true,
      });
    } else {
      this.addUser();
    }
  };

  addUser = () => {
    this.props.addUser({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      userName: this.state.userName,
    });

    this.setState({
      firstName: "",
      lastName: "",
      userName: "",
      userAlreadyExists: false,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value.trim(),
    });
  };

  inputIsEmpty = () => {
    return (
      this.state.firstName === "" ||
      this.state.lastName === "" ||
      this.state.userName === ""
    );
  };

  render() {
    return (
      <form onSubmit={this.validateAndAddUser}>
        <input
          type="text"
          value={this.state.firstName}
          placeholder="First Name"
          name="firstName"
          onChange={this.handleChange}
        />
        <input
          type="text"
          value={this.state.lastName}
          placeholder="Last Name"
          name="lastName"
          onChange={this.handleChange}
        />
        <input
          type="text"
          value={this.state.userName}
          placeholder="User Name"
          name="userName"
          onChange={this.handleChange}
        />
        {this.state.userAlreadyExists && (
          <span className="error">User Already Exist</span>
        )}
        <button className="smallButton" disabled={this.inputIsEmpty()}>
          Add
        </button>
      </form>
    );
  }
}

export default AddUser;
