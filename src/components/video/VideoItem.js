import React, { Component } from "react";
import "./Video.scss";

export class VideoItem extends Component {
  render() {
    const { video, onVideoSelect } = this.props;
    console.log(video);
    return (
      <div onClick={() => onVideoSelect(video)} className="video-list__item">
        <img
          alt={video.snippet.title}
          className="video-list__item--image"
          src={video.snippet.thumbnails.medium.url}
        />
        <div className="video-list__item--content">
          <div className="header"> {video.snippet.title} </div>
        </div>
      </div>
    );
  }
}

export default VideoItem;
