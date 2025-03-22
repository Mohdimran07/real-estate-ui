import React from "react";
import "./card.scss";
import { Link } from "react-router";

const Card = ({ item }) => {
  console.log(item);
  return (
    // <div className="card">
    //   <Link to={`/${item.id}`} className="imgContainer">
    //     <img src={item.images[0]} alt="" />
    //   </Link>
    //   <div className="textContainer">
    //     <h2 className="title">
    //       <Link to={`/${item.id}`}>{item.title}</Link>
    //     </h2>
    //     <p className="address">
    //       <img src="/pin.png" alt="" />
    //       <span>{item.address}</span>
    //     </p>
    //     <p className="price">₹ {item.price}</p>
    //     <div className="bottom">
    //       <div className="features">
    //         <div className="feature">
    //           <img src="/bed.png" alt="" />
    //           <span>{item.bedroom} bedroom</span>
    //         </div>
    //         <div className="feature">
    //           <img src="/bath.png" alt="" />
    //           <span>{item.bathroom} bathroom</span>
    //         </div>
    //       </div>
    //       <div className="icons">
    //         <div className="icon">
    //           <img src="/save.png" alt="" />
    //         </div>
    //         <div className="icon">
    //           <img src="/chat.png" alt="" />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // <div className="container">
    //   <div class="cards">
    //     <div class="card-item">
    //       <div class="card-image"></div>
    //       <div class="card-info">
    //         <h2 class="card-title">Exploring around</h2>
    //         <p class="card-intro">
    //           Far far away, behind the word mountains, far from the countries
    //           Vokalia and Consonantia, there live the blind texts.
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>
    
   
    <div className="property-card">
      <Link to={`/${item.id}`} >
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
