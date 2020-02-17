import React, { Component } from "react";
import "../CardContainer.scss";

import AuthorCard from "../../Cards/Author/AuthorCard";

export class AuthorCardContainer extends Component {
  render() {
    const { authors } = this.props;

    return (
      <div className="container">
        {authors.map((a, i) => (
          <AuthorCard key={`author-card-${i}`} author={a} />
        ))}
      </div>
    );
  }
}

export default AuthorCardContainer;
