import React from "react";
import { connect } from "react-redux";

class Result extends React.Component {
  render() {
    const { question, questionAuthor, authedUser } = this.props;

    const isOptionOneSelected = question.optionOne.votes.includes(authedUser);
    const numberOfOptionOneVotes = question.optionOne.votes.length;
    const numberOfOptionTwoVotes = question.optionTwo.votes.length;
    const totalNumberOfVotes = numberOfOptionOneVotes + numberOfOptionTwoVotes;

    return (
      <div>
        <div className="question-author">{`Added by ${questionAuthor.name}`}</div>
        <div className="question">
          <img
            src={questionAuthor.avatarURL}
            alt={`${questionAuthor.name}`}
            className="result-avatar"
          />

          <div className="result-info">
            <div>
              <span>Results:</span>
            </div>
            <div
              className={
                isOptionOneSelected ? "selected-result" : "unselected-result"
              }
            >
              <div
                style={{ height: "30px" }}
              >{`Would you rather ${question.optionOne.text}?`}</div>
              {isOptionOneSelected && (
                <div className="your-vote">Your vote</div>
              )}
              <div className="progress-div">
                <div
                  style={{
                    width: `${
                      (numberOfOptionOneVotes / totalNumberOfVotes) * 100
                    }%`,
                  }}
                  className="progress"
                >
                  <p style={{ paddingTop: "5px" }}>{`${(
                    (numberOfOptionOneVotes / totalNumberOfVotes) *
                    100
                  ).toFixed(0)}%`}</p>
                </div>
              </div>
              <div className="center">{`${numberOfOptionOneVotes} out of ${totalNumberOfVotes} votes`}</div>
            </div>

            {
              // OptionTwo start
            }

            <div
              className={
                isOptionOneSelected ? "unselected-result" : "selected-result"
              }
            >
              <div
                style={{ height: "30px" }}
              >{`Would you rather ${question.optionTwo.text}?`}</div>
              {!isOptionOneSelected && (
                <div className="your-vote">Your vote</div>
              )}
              <div className="progress-div">
                <div
                  style={{
                    width: `${
                      (numberOfOptionTwoVotes / totalNumberOfVotes) * 100
                    }%`,
                  }}
                  className="progress"
                >
                  <p style={{ paddingTop: "5px" }}>{`${(
                    (numberOfOptionTwoVotes / totalNumberOfVotes) *
                    100
                  ).toFixed(0)}%`}</p>
                </div>
              </div>
              <div className="center">{`${numberOfOptionTwoVotes} out of ${totalNumberOfVotes} votes`}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ questions, authedUser, users }, { id }) => ({
  question: questions[id],
  questionAuthor: users[questions[id].author],
  authedUser,
}))(Result);
