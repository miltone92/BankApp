import React, { Component } from "react";
import "./Alert.scss";

export class Alert extends Component {
  removeAlert = () => {
    //animate
    let alertBar = document.getElementById("alertBar");
    console.log(alertBar);

    alertBar.style.marginTop = "-60px";

    // document.getElementById("alertBar").remove();
  };

  render() {
    const { show, alertType, text } = this.props;
    let alertBar = document.getElementById("alertBar");
    if (alertBar !== null) {
      alertBar.style.marginTop = "0px";
    }

    if (show) {
      return (
        <div className={`${alertType} alert-bar`} id="alertBar">
          <div className="alert-bar__content">
            <p className="alert-bar__content--p">{text}</p>
            <button
              className="alert-bar__content--button"
              onClick={this.removeAlert}
            >
              <i class="fas fa-bomb"></i>
            </button>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default Alert;
