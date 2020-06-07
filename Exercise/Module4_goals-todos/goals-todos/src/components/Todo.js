import React from "react";
import { connect } from "react-redux";
import List from "./List";
import {
  handleAddTodo,
  handleDeleteTodo,
  handleToggleTodo,
} from "../actions/todos";

class Todo extends React.Component {
  addItem = (e) => {
    e.preventDefault();

    this.props.dispatch(
      handleAddTodo(this.input.value, () => (this.input.value = ""))
    );
  };

  deleteItem = (todo) => {
    this.props.dispatch(handleDeleteTodo(todo));
  };

  toggleItem = (id) => {
    this.props.dispatch(handleToggleTodo(id));
  };

  render() {
    const { todos } = this.props;
    return (
      <div>
        <h1>Todo List</h1>
        <input
          type="text"
          id="todo"
          placeholder="Add Todo"
          ref={(input) => (this.input = input)}
        />
        <button id="todoBtn" onClick={this.addItem}>
          Add Todo
        </button>
        <List
          items={todos}
          deleteItem={this.deleteItem}
          toggle={this.toggleItem}
        />
      </div>
    );
  }
}

export default connect((state) => ({
  todos: state.todos,
}))(Todo);
