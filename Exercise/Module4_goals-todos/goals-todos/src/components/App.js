import React from "react";
import ConnectedTodo from "./Todo";
import ConnectedGoal from "./Goal";
import { handleInitData } from "../actions/shared";
import { connect } from "react-redux";

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitData());
  }

  render() {
    if (this.props.loading === true) {
      return <h2>Loading..</h2>;
    }

    return (
      <div>
        <ConnectedTodo />
        <ConnectedGoal />
      </div>
    );
  }
}

export default connect((state) => ({
  loading: state.loading,
}))(App);
