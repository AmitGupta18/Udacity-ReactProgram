import React, { Component } from "react";
import ListContacts from "./ListContacts";
import * as ContactsAPI from "./utils/ContactsAPI";
import { Route } from "react-router-dom";
import CreateContact from "./CreateContact";

class App extends Component {
  state = {
    contacts: [],
  };

  componentDidMount() {
    ContactsAPI.getAll().then((contacts) =>
      this.setState(() => ({
        contacts: contacts,
      }))
    );
  }

  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((c) => {
        return c.id !== contact.id;
      }),
    }));

    ContactsAPI.remove(contact);
  };

  createContact = (values) => {
    ContactsAPI.create(values).then((contact) =>
      this.setState((prevState) => ({
        contacts: [...prevState.contacts, contact],
      }))
    );
  };

  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <ListContacts
              contacts={this.state.contacts}
              onDeleteContact={this.removeContact}
            />
          )}
        />
        {/* <Route path="/create" component={CreateContact} /> */}
        <Route
          path="/create"
          render={({ history }) => (
            <CreateContact
              createContact={(values) => {
                this.createContact(values);
                history.push("/");
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default App;