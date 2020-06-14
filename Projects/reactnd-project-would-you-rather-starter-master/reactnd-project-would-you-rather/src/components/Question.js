import React from "react";
import { connect } from "react-redux";
import { handleSaveAnswer } from "../actions/questions";
import { withRouter } from "react-router-dom";

class Question extends React.Component {
  state = {
    selectedOption: "optionOne",
  };

  handleViewPoll = (e) => {
    e.preventDefault();
    const { history, id } = this.props;
    history.push(`/questions/${id}`);
  };

  handleOptionChange = (value) => {
    this.setState(() => ({
      selectedOption: value,
    }));
  };

  handleSubmit = (e) => {
    const { dispatch, id } = this.props;
    const { selectedOption } = this.state;

    dispatch(handleSaveAnswer(id, selectedOption));
  };

  render() {
    const { user, question, showOptions } = this.props;

    if (user === null) {
      return <h2 className="center">404 - Not Found!</h2>;
    }

    return (
      <div>
        <div className="question-author">{`${user.name} asks:`}</div>
        <div className="question">
          <img src={user.avatarURL} alt={`${user.name}`} className="avatar" />

          <div className="question-info">
            <div>
              <span>Would You Rather</span>
              <div>
                {showOptions ? (
                  <div>
                    <div className="radio-div">
                      <input
                        type="radio"
                        className="radio-button"
                        value="optionOne"
                        checked={this.state.selectedOption === "optionOne"}
                        onChange={(e) =>
                          this.handleOptionChange(e.target.value)
                        }
                      />
                      <span className="radio-button-label">
                        {question.optionOne.text}
                      </span>
                    </div>
                    <div className="radio-div">
                      <input
                        type="radio"
                        className="radio-button"
                        value="optionTwo"
                        checked={this.state.selectedOption === "optionTwo"}
                        onChange={(e) =>
                          this.handleOptionChange(e.target.value)
                        }
                      />
                      <span className="radio-button-label">
                        {question.optionTwo.text}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p>{`... ${question.optionOne.text.substr(0, 15)}...`}</p>
                )}
              </div>
              {showOptions ? (
                <button className="submit-ans-btn" onClick={this.handleSubmit}>
                  Submit
                </button>
              ) : (
                <button className="view-poll-btn" onClick={this.handleViewPoll}>
                  View Poll
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, { id }) {
  const question = questions[id];
  const user = question ? users[question.author] : null;
  return {
    question,
    user,
  };
}

export default withRouter(connect(mapStateToProps)(Question));
