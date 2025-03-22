import React from "react";
import "./postDetails.scss";
import DOMPurify from "dompurify";

const PostDetails = ({data}) => {
  return (
    <div className="info-section">
      <div className="top-section">
        <div className="post">
          <h1>{data.title}</h1>
          <div className="address">
            <img src="/pin.png" alt="location" />
            <span>{data.address}</span>
          </div>
          <div className="price">₹ {data.price}</div>
        </div>
        <div className="user">
          <img src={data.user.avatar || "/noavatar.jpg"} alt="" />
          <span>{data.user.name}</span>
        </div>
      </div>
      <div
        className="bottom-section"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(data.PostDetail?.desc),
        }}
      ></div>
    </div>
  );
};

export default PostDetails;
