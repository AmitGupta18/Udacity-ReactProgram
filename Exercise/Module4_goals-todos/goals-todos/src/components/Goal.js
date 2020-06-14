import React from "react";
import { connect } from "react-redux";
import List from "./List";
import { handleAddGoal, handleDeleteGoal } from "../actions/goals";

class Goal extends React.Component {
  addItem = (e) => {
    e.preventDefault();

    this.props.dispatch(
      handleAddGoal(this.input.value, () => (this.input.value = ""))
    );
  };

  deleteItem = (goal) => {
    this.props.dispatch(handleDeleteGoal(goal));
  };

  render() {
    const { goals } = this.props;
    return (
      <div>
        <h1>Goals</h1>
        <input
          type="text"
          id="goal"
          placeholder="Add Goal"
          ref={(input) => (this.input = input)}
        />
        <button id="goalBtn" onClick={this.addItem}>
          Add Goal
        </button>
        <List items={goals} deleteItem={this.deleteItem} />
      </div>
    );
  }
}

export default connect((state) => ({
  goals: state.goals,
}))(Goal);
