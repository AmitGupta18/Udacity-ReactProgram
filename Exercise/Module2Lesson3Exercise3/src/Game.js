import React from "react";

class Game extends React.Component {
  constructor(props) {
    super(props);
    const valuesArr = this.retrieveNewQuestion();

    this.state = {
      value1: valuesArr[0],
      value2: valuesArr[1],
      value3: valuesArr[2],
      proposedAnswer: valuesArr[3],
    };
  }

  retrieveNewQuestion = () => {
    const value1 = Math.floor(Math.random() * 100);
    const value2 = Math.floor(Math.random() * 100);
    const value3 = Math.floor(Math.random() * 100);
    const proposedAnswer =
      Math.floor(Math.random() * 3) + value1 + value2 + value3;
    return [value1, value2, value3, proposedAnswer];
  };

  handleAnswer = (event) => {
    const valuesArr = this.retrieveNewQuestion();
    this.setState({
      value1: valuesArr[0],
      value2: valuesArr[1],
      value3: valuesArr[2],
      proposedAnswer: valuesArr[3],
    });
    this.props.increaseQuestion();

    const isProposedAnsCorrect = this.evaluatePropsedAnswer();
    if (
      (isProposedAnsCorrect && event.target.name === "true") ||
      (!isProposedAnsCorrect && event.target.name === "false")
    ) {
      this.props.increaseScore();
    }
  };

  evaluatePropsedAnswer = () => {
    const { value1, value2, value3, proposedAnswer } = this.state;
    const corrAnswer = value1 + value2 + value3;

    return corrAnswer === proposedAnswer;
  };

  render() {
    const { value1, value2, value3, proposedAnswer } = this.state;
    return (
      <div>
        <div className="equation">
          <p className="text">{`${value1} + ${value2} + ${value3} = ${proposedAnswer}`}</p>
        </div>
        <div>
          <button onClick={this.handleAnswer} name="true">
            True
          </button>
          <button onClick={this.handleAnswer} name="false">
            False
          </button>
        </div>
      </div>
    );
  }
}

export default Game;
