import React, { Component } from "react";
import "./Video.scss";

export class VideoDetails extends Component {
  render() {
    const { video } = this.props;
    console.log(video);
    let videoSrc = `http://www.youtube.com/embed/${video.id.videoId}`;
    return (
      <div className="video-detail">
        <div className="video-detail__container">
          <iframe
            title="video player"
            src={videoSrc}
            className="video-detail__container--iframe"
          />
        </div>
        <div className="video-detail__container--details">
          <h4 className="">{video.snippet.title}</h4>
          <p>{video.snippet.description}</p>
        </div>
      </div>
    );
  }
}

export default VideoDetails;
