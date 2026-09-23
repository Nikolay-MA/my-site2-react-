import React from "react";

export default function SchoolStudyPage({ schoolData }) {
  return (
    <section className="info-section-block page-fade-animation">
      <h2>Учеба в школе</h2>
      <div className="school-grid-layout">
        <div className="school-info-card">
          <h3>{schoolData.title}</h3>
          <p><strong>Директор школы:</strong> {schoolData.director}</p>
          <p><strong>Направление:</strong> {schoolData.classType}</p>
        </div>
        <div className="school-info-card">
          <h3>Спортивные занятия</h3>
          <p>За годы учебы я опробовал разные направления физической активности:</p>
          <ul className="sports-bullet-list">
            {schoolData.sports.map((sport, i) => (
              <li key={i}>{sport}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
