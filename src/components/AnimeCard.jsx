import React from "react";

export default function AnimeCard({ rank, title, sub }) {
  return (
    <div className="anime-card">
      <span className="anime-badge">{rank}</span>
      <h3>{title}</h3>
      <p>{sub}</p>
    </div>
  );
}
