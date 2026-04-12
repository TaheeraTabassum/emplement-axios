import React from "react";
import { Link } from "react-router";

export default function Card({ movieData }) {
  return (
    <div>
      <li className="hero-container">
        <div className="main-cointeiner">
          <div className="poster-container">
            <p>{movieData.id}</p>
          </div>
          <div className="ticket-container">
            <div className="ticket_content">
              <Link to={`/movie/${movieData.id}`}>
                <button className="ticket_buy-btn">Watch Now</button>
                </Link>
              
            </div>
          </div>
        </div>
      </li>
    </div>
  );
}
