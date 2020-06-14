import React from "react";
import { connect } from "react-redux";
import ConnectedTweet from "./Tweet";

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h3 className="center"> Your Timeline</h3>
        <ul className="dashboard-list">
          {this.props.tweetIds.map((id) => (
            <li key={id}>
              <ConnectedTweet id={id} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default connect((state) => {
  const { tweets } = state;
  return {
    tweetIds: Object.keys(tweets).sort(
      (a, b) => tweets[b].timestamp - tweets[a].timestamp
    ),
  };
})(Dashboard);
