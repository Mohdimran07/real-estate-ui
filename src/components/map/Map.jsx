import React from "react";
import "./map.scss";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router";

const Map = ({ items }) => {
  const position = [51.505, -0.09];
  console.log(items);
  return (
    <MapContainer
      center={items.length === 1 ? [items[0].latitude, items[0].longitude] : position}
      zoom={7}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Marker position={[item.latitude, item.longitude]}>
          <Popup>
            <div className="popContainer">
              <img src={item.img} alt="" />
              <div className="textContainer">
                <Link to={`/${item.id}`}>{item.title}</Link>
                <span className="bed">{item.bedroom} Bedroom</span>
                <b>$ {item.price}</b>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
