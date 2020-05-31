import React from "react";
import PropTypes from "prop-types";

class ListUsers extends React.Component {
  buttonTextArr = [
    "Hide the Number of Games Played",
    "Show the Number of Games Played",
  ];

  state = {
    buttonTextIdx: 0,
  };

  onToggleButtonClick = () => {
    this.setState((prevState) => ({
      buttonTextIdx: prevState.buttonTextIdx === 1 ? 0 : 1,
    }));
  };

  render() {
    return (
      <div>
        <button className="smallButton" onClick={this.onToggleButtonClick}>
          {this.buttonTextArr[this.state.buttonTextIdx]}
        </button>
        <div>
          <ol>
            {this.props.users.map((user) => (
              <li key={user.userName}>{`${user.userName} played ${
                this.state.buttonTextIdx === 0 ? user.numGames : "*"
              } games`}</li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

ListUsers.propTypes = {
  users: PropTypes.array.isRequired,
};
export default ListUsers;
