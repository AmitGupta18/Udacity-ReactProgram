import React from "react";
import "./App.css";

class ContactList extends React.Component {
  render() {
    const people = this.props.contacts;

    return (
      <ol>
        {people.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ol>
    );
  }
}

function App() {
  return (
    <div>
      <ContactList
        contacts={[{ name: "Richard" }, { name: "Andrew" }, { name: "Tyler" }]}
      />
      <ContactList contacts={[{ name: "A" }, { name: "B" }]} />
    </div>
  );
}

export default App;
