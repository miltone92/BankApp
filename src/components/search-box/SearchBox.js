import React, { Component } from "react";
import "./Search.scss";

const onKeyUp = (event, keyUp) => {
  if (keyUp) {
    let input = document.getElementById("searchBoxInput");
    keyUp(input.value);
  }
};

const onSubmit = (event, onEnterKey) => {
  if (onEnterKey) {
    if (event.keyCode == 13) {
      let input = document.getElementById("searchBoxInput");
      onEnterKey(input.value);
    }
  }
};

export class SearchForm extends Component {
  render() {
    const { keyUp, onEnterKey } = this.props;
    return (
      <div className="search-box-container">
        <div className="search-box">
          <input
            onKeyUp={event => onKeyUp(event, keyUp)}
            onKeyUp={event => onSubmit(event, onEnterKey)}
            type="text"
            className="search-box__text"
            placeholder="Type here"
            id="searchBoxInput"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck="false"
          // ref={node => (input = node)}
          />
          <a className="search-box__button" href="#">
            <i className="fas fa-search"></i>
          </a>
        </div>
      </div>
    );
  }
}

export default SearchForm;
