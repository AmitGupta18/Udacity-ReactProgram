import React from "react";
import "./App.css";
import Header from "./Header";
import Items from "./Items";
import AddItem from "./AddItem";
import DeleteItem from "./DeleteItem";

class App extends React.Component {
  state = {
    items: [],
  };

  addItem = (event, value) => {
    event.preventDefault();
    this.setState((oldState) => ({
      items: [...oldState.items, value],
    }));
  };

  deleteLastItem = (event) => {
    this.setState((prevState) => ({ items: this.state.items.slice(0, -1) }));
  };

  render() {
    return (
      <div className="App">
        <Header />
        <AddItem addItem={this.addItem} />
        <DeleteItem
          deleteItem={this.deleteLastItem}
          numItems={this.state.items.length}
        />
        <Items items={this.state.items} />
      </div>
    );
  }
}

export default App;
