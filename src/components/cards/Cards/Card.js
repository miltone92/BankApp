import React, { Component } from "react";
import "./Card.scss";

export class Card extends Component {
  render() {
    const { title, info } = this.props;
    return (
      <div className="card">
        <div className="card__overlay">
          <div className="card__overlay-text">Hello World</div>
        </div>
        <div className="">
          <img
            alt="card-img"
            className="card__image"
            src="https://images.unsplash.com/photo-1541727687969-ce40493cd847?ixlib=rb-1.2.1&auto=format&fit=crop&w=1938&q=80"
          />
        </div>
        <div className="">
          <h2>{title}</h2>
          <p>{info}</p>
        </div>
      </div>
    );
  }
}

export default Card;
