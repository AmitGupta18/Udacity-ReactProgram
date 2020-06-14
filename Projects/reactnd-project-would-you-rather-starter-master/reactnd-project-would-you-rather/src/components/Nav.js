import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav(props) {
  return (
    <nav className="nav">
      <div>
        <NavLink to="/home" exact activeClassName="active">
          <div>
            <label>Home</label>
          </div>
        </NavLink>
        <NavLink to="/add" exact activeClassName="active">
          <div>
            <label> New Question </label>
          </div>
        </NavLink>
        <NavLink to="/leaderboard" exact activeClassName="active">
          <div>
            <label> Leader Board </label>
          </div>
        </NavLink>

        {props.authedUser && (
          <div style={{ marginRight: "0px" }}>
            <div
              style={{ marginTop: "10px" }}
            >{`Hello, ${props.authedUser.name}`}</div>
            <img
              src={props.authedUser.avatarURL}
              alt={props.authedUser.id}
              className="nav-avatar"
            />
            <NavLink to="/" exact activeClassName="active">
              <div>
                <label>Logout</label>
              </div>
            </NavLink>
          </div>
        )}
      </div>
      <hr style={{ border: "2px solid #34c9b5", marginTop: "0px" }} />
    </nav>
  );
}
