import "../css/favorite.css";
import logo from "../logos/logo_1.svg";
import mapFav from "../images/map_fav.svg";
import favPlace from "../images/fav-place.svg";
import { useEffect, useState } from "react";
import fetcher from "../lib/fetcher";
import React, { Fragment } from 'react';

// دالة لحساب المسافة بين نقطتين باستخدام Haversine Formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const radius = 6371; // نصف قطر الأرض بالكيلومترات
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = radius * c;
  return distance;

}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

export default function Favorite() {
  const [pins, setPins] = useState([]);

  useEffect(() => {
    getPins();
  }, []);

  const getPins = async () => {
    const pins = await fetcher("/pins");
    setPins(pins);
  };

  return (
    <div className="favorite-page">
      <div className="header">
        <div className="container">
          <div className="nav-left">
            <div className="img-logo">
              <a href="./">
                <img decoding="async" className="logo" src={logo} alt="" />
              </a>
            </div>
            <div className="left-link">
              <a href="./map">Map</a>
              <a href="./favorite">Favorite</a>
            </div>
          </div>
          <div className="nav-right">
            <div className="right-link">
              <a href="./logout">LogOut</a>
            </div>
          </div>
        </div>
      </div>
      <div className="about-fav">
        <div className="container">
          <div className="pargh-fav">
            <h2>Favorite Location</h2>
            <p>
              Here you will find all the locations that have been saved with the
              possibility of adding coordinates
            </p>
          </div>
          <div className="img-fav">
            <img src={mapFav} alt="" />
          </div>
        </div>
      </div>

      <div className="fav-map" id="fav-map">
        <div className="container">
          <h2 style={{ marginTop: "20px", color: "#00A850" }}>
            Favorite Name Place
          </h2>
          <div className="fav-map-content">
            {pins.map((pin, index) => {
              // حساب المسافة بين النقطة الحالية وباقي النقاط
              const distances = pins
              .filter((_, i) => i !== index)
              .map((otherPin) => {
                const distance = calculateDistance(pin.lat, pin.long, otherPin.lat, otherPin.long);
                const name = otherPin.title;
                return { name, distance };
              });

              return (
                <div className="card" key={index}>
                  <img src={favPlace} alt="" />
                  <div className="info">
                    <h3>{pin.title}</h3>
                    <p>{pin.desc}</p>
                    <p>
                      Distances:{" "}<br />
                      {distances.map(({ name, distance }, index) => (
                        <Fragment key={index}>
                          {name}: {distance} m
                          <br />
                        </Fragment>
                      ))}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}