import React from "react";
import { connect } from "react-redux";
import { handleSaveQuestion } from "../actions/questions";

class AddQuestion extends React.Component {
  state = {
    optionOne: "",
    optionTwo: "",
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState(() => ({
      [name]: value.trim(),
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { dispatch, history } = this.props;
    const { optionOne, optionTwo } = this.state;

    if (optionOne === optionTwo || optionTwo === "" || optionOne === "") {
      return alert("Please enter valid options");
    }

    dispatch(handleSaveQuestion(optionOne, optionTwo));

    history.push("/home");
  };

  render() {
    return (
      <div>
        <div className="add-question-header">
          <span>Create New Question</span>
        </div>
        <div className="add-question">
          <p>Complete the question:</p>
          <span>Would you rather ...</span>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Enter Option One Text Here"
              className="text-field"
              name="optionOne"
              onChange={this.handleChange}
            />
            <div className="text-field-separator">
              <span>OR</span>
            </div>
            <input
              type="text"
              placeholder="Enter Option One Text Here"
              className="text-field"
              name="optionTwo"
              onChange={this.handleChange}
            />
            <button
              type="submit"
              className="submit-ans-btn"
              style={{ width: "450px" }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(AddQuestion);
