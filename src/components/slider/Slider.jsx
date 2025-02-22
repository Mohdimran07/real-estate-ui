import React, { useState } from "react";
import "./slider.scss";

const Slider = ({ images }) => {
  const [imageIdx, setImageIdx] = useState(null);

  const changeSlide = (direction) => {
    if (direction === "left") {
      if (imageIdx === 0) {
        setImageIdx(images.length - 1);
      } else {
        setImageIdx(imageIdx - 1);
      }
    } else {
      if (imageIdx === images.length - 1) {
        setImageIdx(0);
      } else {
        setImageIdx(imageIdx + 1);
      }
    }
  };

  return (
    <div className="slider">
      {imageIdx !== null && (
        <div className="fullSlider">
          <div className="arrow">
            <img src="/arrow.png" alt="" onClick={() => changeSlide("left")} />
          </div>
          <div className="imgContainer">
            <img src={images[imageIdx]} alt="" />
          </div>
          <div className="arrow">
            <img
              src="/arrow.png"
              className="right"
              alt=""
              onClick={() => changeSlide("right")}
            />
          </div>
          <div className="close" onClick={() => setImageIdx(null)}>
            X
          </div>
        </div>
      )}

      <div className="largeImage">
        <img src={images[0]} alt="" onClick={() => setImageIdx(0)} />
      </div>
      <div className="smallImages">
        {images.slice(1).map((img, idx) => (
          <img
            src={img}
            alt=""
            key={idx}
            onClick={() => setImageIdx(idx + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
