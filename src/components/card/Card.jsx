import React from "react";
import "./card.scss";
import { Link } from "react-router";

const Card = ({ item }) => {
  return (
    <>
      <div className="property-card">
        <Link to={`/${item.id}`}>
          <img src={item.images[0]} alt="" className="property-image" />
        </Link>

        <div className="property-details">
          <p className="title">{item.title}</p>
          <h3 className="price">₹ {item.price}</h3>
          <p>{item.address}</p>
          {/* <p>213 King Edward Ave, London, ON N5Z 3T9</p> */}
          <div className="property-meta">
            <span>{item.property}</span>
            <span>54m2</span>
            <span>3</span>
          </div>
          {/* <button className="favorite-button">❤️</button> */}
        </div>
      </div>
    </>
  );
};

export default Card;
