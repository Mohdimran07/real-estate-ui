import React from "react";
import "./featureList.scss";
const FeatureList = ({data}) => {
  return (
    <div className="wrapper">
      <p className="title">General</p>
      <div className="listVertical">
        <div className="feature">
          <img src="/utility.png" alt="" />
          <div className="featureText">
            <span>Utilities</span>
            {data.PostDetail?.utilies === "owner" ? (
              <p>Owner is responsible</p>
            ) : (
              <p>Tenant is responsible</p>
            )}
          </div>
        </div>
        <div className="feature">
          <img src="/pet.png" alt="" />
          <div className="featureText">
            <span>Pet Policy</span>
            {data.PostDetail?.pet === "allowed" ? (
              <p>Pets allowed</p>
            ) : (
              <p>Pets not allowed</p>
            )}
          </div>
        </div>
        <div className="feature">
          <img src="/fee.png" alt="" />
          <div className="featureText">
            <span>Income Policy</span>
            <p>{data.PostDetail?.income}</p>
          </div>
        </div>
      </div>
      <p className="title">Room Sizes</p>
      <div className="sizes">
        <div className="size">
          <img src="/size.png" alt="" />
          <span>{data.PostDetail?.size} sqft</span>
        </div>
        <div className="size">
          <img src="/bed.png" alt="" />
          <span>{data.bedroom} beds</span>
        </div>
        <div className="size">
          <img src="/bath.png" alt="" />
          <span>{data.bathroom} bathroom</span>
        </div>
      </div>
      <p className="title">Near by places</p>
      <div className="listHorizontal">
        <div className="feature">
          <img src="/school.png" alt="" />
          <div className="featureText">
            <span>School</span>
            <p>{data.PostDetail?.school} m away</p>
          </div>
        </div>
        <div className="feature">
          <img src="/pet.png" alt="" />
          <div className="featureText">
            <span>Bus Stop</span>
            <p>{data.PostDetail?.bus}m away</p>
          </div>
        </div>
        <div className="feature">
          <img src="/fee.png" alt="" />
          <div className="featureText">
            <span>Restaurant</span>
            <p>{data.PostDetail?.restaurant}m away</p>
          </div>
        </div>
      </div>
      <p className="title"></p>
     
    </div>
  );
};

export default FeatureList;
