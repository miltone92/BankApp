import React, { Component } from "react";

import "./KanjiCard.scss";

import Button from "../../../buttons/mediumButton/Button";

export class KanjiCard extends Component {
  componentWillUpdate() {}

  constructor() {
    super();
    this.state = {
      answer: false
    };
  }

  toggleAnswer = () => {
    this.setState({ answer: !this.state.answer });
  };

  render() {
    const { kanji, show } = this.props;

    if (!show) {
      return (
        <div className="center-children">
          <div className="kanji-card">
            <div className="kanji-card__body">
              <div className="center-children">
                <div className="questionKanji">{kanji.kanji.character}</div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="center-children">
          <div className="kanji-card">
            <div className="center-children">
              <label className="kanji-card__title">
                {kanji.kanji.character}
              </label>
            </div>
            <div className="kanji-card__body">
              <label className="kanji-card__body--header">On-Yomi </label>
              <br />
              <label>Romaji: {kanji.kanji.onyomi.romaji}</label>
              <br />
              <label>Katakana: {kanji.kanji.onyomi.katakana}</label>
              <br />
              <br />
              <label className="kanji-card__body--header">Kun-Yomi </label>
              <br />
              <label>Romaji: {kanji.kanji.kunyomi.romaji}</label>
              <br />
              <label>Hiragana: {kanji.kanji.kunyomi.hiragana}</label>
              <br />
              <br />
              <label className="kanji-card__body--header">Stroke count: </label>
              <label>{kanji.kanji.strokes.count}</label>
              <br />
              <br />
              <label className="kanji-card__body--header">Grade: </label>
              <label>{kanji.references.grade}</label>
              <br />
              <br />
              <label className="kanji-card__body--header">Translation: </label>
              <label>{kanji.kanji.meaning.english}</label>
              <br />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default KanjiCard;
