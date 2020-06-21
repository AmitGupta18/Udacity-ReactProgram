import React from "react";
import { connect } from "react-redux";
import Question from "./Question";
import Result from "./Result";

function ViewPoll(props) {
  const { isAnswered, id } = props;
  return (
    <div>
      {isAnswered ? (
        <Result id={id} />
      ) : (
        <Question id={id} showOptions={isAnswered === false} />
      )}
    </div>
  );
}

function mapStateToProps({ users, authedUser }, props) {
  const { id } = props.match.params;
  const isAnswered = Object.keys(users[authedUser].answers).includes(id);
  return {
    isAnswered,
    id,
  };
}

export default connect(mapStateToProps)(ViewPoll);
