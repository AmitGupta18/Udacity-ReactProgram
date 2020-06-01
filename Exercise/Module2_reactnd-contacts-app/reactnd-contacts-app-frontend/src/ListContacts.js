import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class ListContacts extends React.Component {
  state = {
    searchQuery: "",
  };

  updateQuery = (query) => {
    this.setState({
      searchQuery: query.trim(),
    });
  };

  clearQuery = () => {
    this.updateQuery("");
  };

  render() {
    const { contacts, onDeleteContact } = this.props;
    const { searchQuery } = this.state;

    // Filter out the contacts on the basis of query
    const contactsToDisplay =
      searchQuery === ""
        ? contacts
        : contacts.filter((c) =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase())
          );

    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input
            type="text"
            className="search-contacts"
            placeholder="Search Contacts"
            value={this.state.searchQuery}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          <Link to="/create" className="add-contact" />
        </div>

        {contactsToDisplay.length !== contacts.length && (
          <div className="showing-contacts">
            <span>
              Now showing {contactsToDisplay.length} of {contacts.length}
            </span>
            <button onClick={this.clearQuery}> Show All </button>
          </div>
        )}

        <ol className="contact-list">
          {contactsToDisplay.map((contact) => (
            <li key={contact.id} className="contact-list-item">
              <div
                className="contact-avatar"
                style={{
                  backgroundImage: `url(${contact.avatarURL})`,
                }}
              />
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.handle}</p>
              </div>
              <button
                className="contact-remove"
                onClick={() => onDeleteContact(contact)}
              >
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

ListContacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ListContacts;
