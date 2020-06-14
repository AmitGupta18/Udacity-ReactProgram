import React, { Fragment } from "react";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";
import Home from "./Home";
import ViewPoll from "./ViewPoll";
import AddQuestion from "./AddQuestion";
import LeaderBoard from "./LeaderBoard";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./Nav";
import Login from "./Login";
import { handleInitialData } from "../actions/shared";

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }

  render() {
    const { authedUser } = this.props;
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav authedUser={authedUser} />

            {typeof authedUser === "undefined" ? (
              <div>
                <Route path="/" component={Login} />
              </div>
            ) : (
              <div>
                <Route exact path="/" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/add" component={AddQuestion} />
                <Route path="/questions/:id" component={ViewPoll} />
                <Route path="/leaderboard" component={LeaderBoard} />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  if (authedUser !== null) {
    return {
      authedUser: users[authedUser],
    };
  }
  return {};
}

export default connect(mapStateToProps)(App);
