import React from "react";
import { connect } from "react-redux";
import Question from "./Question";

class Home extends React.Component {
  state = {
    showAnsweredQuestions: false,
  };

  renderUnansweredQuestions = (e) => {
    if (this.state.showAnsweredQuestions) {
      this.setState(() => ({
        showAnsweredQuestions: false,
      }));
    }
  };

  renderAnsweredQuestions = (e) => {
    if (!this.state.showAnsweredQuestions) {
      this.setState(() => ({
        showAnsweredQuestions: true,
      }));
    }
  };

  render() {
    const { answeredQuestionIds, unansweredQuestionIds } = this.props;
    const { showAnsweredQuestions } = this.state;

    let filteredQuestionIds;
    if (showAnsweredQuestions) {
      filteredQuestionIds = answeredQuestionIds;
    } else {
      filteredQuestionIds = unansweredQuestionIds;
    }

    return (
      <div className="question-list">
        <div>
          <button
            className={
              showAnsweredQuestions
                ? "question-list-button"
                : "question-list-selected-button"
            }
            onClick={this.renderUnansweredQuestions}
          >
            Unanswered Questions
          </button>
          <button
            className={
              showAnsweredQuestions
                ? "question-list-selected-button"
                : "question-list-button"
            }
            onClick={this.renderAnsweredQuestions}
          >
            Answered Questions
          </button>
        </div>
        <ul>
          {filteredQuestionIds &&
            filteredQuestionIds.map((id) => (
              <li key={id}>
                <Question id={id} />
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default connect((state) => {
  const { questions, users, authedUser } = state;

  const questionIds = Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );

  const authedUserObj = users[authedUser];

  return {
    answeredQuestionIds: questionIds.filter((questionId) => {
      return Object.keys(authedUserObj.answers).includes(questionId);
    }),
    unansweredQuestionIds: questionIds.filter((questionId) => {
      return !Object.keys(authedUserObj.answers).includes(questionId);
    }),
  };
})(Home);
