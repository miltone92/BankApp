import React, { Component } from "react";

import ImageGridItem from "./ImageGridItem";
import "./ImageGrid.scss";

export class ImageGrid extends Component {
  imageArrangement = () => {
    let gridItems = document.getElementsByClassName("image-grid__item");

    for (const item of gridItems) {
      let child = item.firstChild;
      let childImage = child.getAttribute("src");

      let childNaturalHeight = child.naturalHeight;
      let childNaturalWidth = child.naturalWidth;

      let childRatio = childNaturalHeight / childNaturalWidth;

      if (childRatio > 1) {
        item.classList.add("vertical");
      } else if (childRatio < 1) {
      }

      //Fit images to their container/hide margins
      item.style.backgroundImage = `url(${childImage})`;
      item.style.backgroundPosition = "center";
      item.style.backgroundSize = "cover";

      child.style.opacity = "0";
    }
  };

  componentDidUpdate() {
    this.imageArrangement();
  }

  render() {
    const { images, customTemplateColumns, customMaxWidth, customMargin } = this.props;
    return (
      <div className="image-grid" style={{ gridTemplateColumns: customTemplateColumns, maxWidth: customMaxWidth, margin: customMargin }}>
        {images.map((image, i) => (
          <ImageGridItem imageUrl={image.urls.regular} key={`image-${i}`} />
        ))}
      </div>
    );
  }
}

export default ImageGrid;
