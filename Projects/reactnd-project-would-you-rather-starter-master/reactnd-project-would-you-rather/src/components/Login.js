import React from "react";
import { connect } from "react-redux";
import { handleLogout } from "../actions/authedUser";
import logo from "../images/logo.png";
import Select from "react-select";
import { handleLogin } from "../actions/authedUser";

class Login extends React.Component {
  state = {
    selectedOption: null,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleLogout());
  }

  handleChange = (selectedOption) => {
    this.setState(() => ({
      selectedOption,
    }));
  };

  signIn = (e) => {
    e.preventDefault();

    const { dispatch, history, location } = this.props;
    const { selectedOption } = this.state;

    const pathName = location.pathname === "/" ? "/home" : location.pathName;

    if (selectedOption && selectedOption.value !== "") {
      dispatch(handleLogin(selectedOption.value));
      history.push(pathName);
    }
  };

  getCustomStyle = () => {
    return {
      control: (base, state) => ({
        ...base,
        background: "#fff",
        borderColor: "#dad7d7",
        boxShadow: state.isFocused ? null : null,

        "&:hover": {
          borderColor: state.isFocused ? "#dad7d7" : "#dad7d7",
        },
      }),
      option: (base, state) => ({
        ...base,
        cursor: "pointer",
        color: "#000",
        background: state.isSelected
          ? "#dad7d7"
          : state.isFocused
          ? "#f3f3f3"
          : "#fff",
        "&:active": {
          background: "#dad7d7",
        },
      }),
      menu: (provided) => ({
        ...provided,
        marginTop: "0px",
      }),
    };
  };

  render() {
    const { users } = this.props;
    let options = [];

    Object.keys(users).forEach((userId) => {
      options.push({
        value: users[userId].id,
        label: (
          <div style={{ height: "29px" }}>
            <img
              src={users[userId].avatarURL}
              alt={users[userId].id}
              className="nav-avatar"
            />
            <div style={{ marginLeft: "50px", marginTop: "-27px" }}>
              {users[userId].name}
            </div>
          </div>
        ),
      });
    });

    const customStyles = this.getCustomStyle();

    const { selectedOption } = this.state;
    return (
      <div>
        <div className="login-header">
          Welcome to the Would You Rather App!
          <div>Please sign in to continue</div>
        </div>
        <div className="login-form">
          <img src={logo} alt="React Logo" className="logo" />

          <div>Sign in</div>
          <form onSubmit={this.signIn}>
            <Select
              styles={customStyles}
              className="login-user-dropdown"
              onChange={this.handleChange}
              options={options}
              placeholder="Select User"
              value={selectedOption}
              multi={false}
              valueRenderer={this.renderValue}
            />

            <button className="sing-in-btn">Sign In</button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(({ users }) => ({
  users,
}))(Login);
