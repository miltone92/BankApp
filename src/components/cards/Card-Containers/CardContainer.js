import React, { Component } from "react";
import "./CardContainer.scss";

import Card from "../Cards/Card";

export class CardContainer extends Component {
  render() {
    const { data } = this.props;

    return (
      <div className="container">
        {data.map(d, i => (
          <Card book={d} />
        ))}
      </div>
    );
  }
}

export default CardContainer;
