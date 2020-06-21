import React from "react";
import { AiFillTrophy } from "react-icons/ai";
import { connect } from "react-redux";

class LeaderBoard extends React.Component {
  render() {
    const { sortedUsers } = this.props;
    const trophyColorCss = ["#f5d443", "#34c9b5", "#949494"];
    return (
      <div>
        {sortedUsers.map((user, index) => (
          <div className="leader" key={user.id}>
            <div className="triangle">
              <AiFillTrophy
                className="trophy-icon"
                style={{ color: trophyColorCss[index] }}
              />
            </div>
            <img src={user.avatarURL} alt={`${user.name}`} className="avatar" />

            <div className="leader-info">
              <div>
                <span>{user.name}</span>
              </div>
              <div className="leader-questions">
                <div>
                  <span>Answered Questions</span>
                  <span style={{ float: "right" }}>
                    {Object.keys(user.answers).length}
                  </span>
                </div>
                <div className="text-field-separator" />
                <div>
                  <span>Created Questions</span>
                  <span style={{ float: "right" }}>
                    {user.questions.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="leader-score">
              <div>Score</div>
              <div style={{ height: "65px" }}>
                <div className="score">
                  <div style={{ paddingTop: "10px" }}>
                    {Object.keys(user.answers).length + user.questions.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  let sortedUsers = [];

  Object.keys(users)
    .sort(
      (a, b) =>
        users[b].questions.length +
        Object.keys(users[b].answers).length -
        (users[a].questions.length + Object.keys(users[a].answers).length)
    )
    .forEach((key) => {
      sortedUsers.push(users[key]);
    });

  return {
    sortedUsers,
  };
}

export default connect(mapStateToProps)(LeaderBoard);
