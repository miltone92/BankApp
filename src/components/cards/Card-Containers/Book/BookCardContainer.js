import React, { Component } from "react";
import "../CardContainer.scss";

import Card from "../../Cards/Card";

export class BookCardContainer extends Component {
  render() {
    const { books } = this.props;

    return (
      <div key="" className="container">
        {books.map((b, i) => (
          <Card
            key={`book-container-card-${i}`}
            title={b.title}
            info={b.author}
          />
        ))}
      </div>
    );
  }
}

export default BookCardContainer;
