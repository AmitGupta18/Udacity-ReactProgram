import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Score from "./Score";
import Game from "./Game";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numQuestions: 0,
      numCorrect: 0,
    };
  }

  increaseScore = () => {
    this.setState((prevState) => ({
      numCorrect: prevState.numCorrect + 1,
    }));
  };

  increaseQuestion = () => {
    this.setState((prevState) => ({
      numQuestions: prevState.numQuestions + 1,
    }));
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ReactND - Coding Practice</h1>
        </header>
        <div className="game">
          <h2>Mental Math</h2>
          <Game
            increaseQuestion={this.increaseQuestion}
            increaseScore={this.increaseScore}
          />
          <Score
            numCorrect={this.state.numCorrect}
            numQuestions={this.state.numQuestions}
          />
        </div>
      </div>
    );
  }
}

export default App;
