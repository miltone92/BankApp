import React, { Component } from "react";
import "./ImageGrid.scss";

export class ImageGridItem extends Component {
  render() {
    const { imageUrl } = this.props;
    return (
      <div className="image-grid__item">
        <img src={imageUrl} />
      </div>
    );
  }
}

export default ImageGridItem;
