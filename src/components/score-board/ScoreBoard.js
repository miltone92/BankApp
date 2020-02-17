import React, { Component } from "react";
import "./ScoreBoard.scss";

export class ScoreBoard extends Component {
  render() {
    let {
      type,
      children,
      correctKanji,
      wrongKanji,
      remainingQuestions,
      scoreColor
    } = this.props;

    // }
    return (
      <div className={`${type} score-board`}>
        <label className={`score-board__header ${scoreColor}`}>{children}</label>
        <div>
          <label className="score-board__detail">{`Correct: ${correctKanji}`}</label>
        </div>
        <label className="score-board__detail">{`Wrong: ${wrongKanji}`}</label>
        <div>
          <label className="score-board__detail">{`Remainig: ${remainingQuestions}`}</label>
        </div>
      </div>
    );
  }
}

export default ScoreBoard;
