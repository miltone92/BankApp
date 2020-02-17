import React, { Component } from "react";
import "./Video.scss";

//conponents
import VideoItem from "./VideoItem";

export class VideoList extends Component {
  render() {
    const { videos, onVideoSelect } = this.props;

    return (
      <div className="video-list">
        {videos.map(video => {
          return (
            <VideoItem
              key={video.id.videoId}
              onVideoSelect={onVideoSelect}
              video={video}
            />
          );
        })}
      </div>
    );
  }
}

export default VideoList;
