import React from "react";
import PropTypes from "prop-types";

const Items = (props) => {
  return (
    <div>
      <p className="items">Items</p>
      <ol className="item-list">
        {props.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    </div>
  );
};

Items.propTypes = {
  items: PropTypes.array,
};

export default Items;
