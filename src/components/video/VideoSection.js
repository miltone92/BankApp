import React, { Component } from "react";
import "./Video.scss";

export class VideoSection extends Component {
  render() {
    return <div className="video-section">{this.props.children}</div>;
  }
}

export default VideoSection;
