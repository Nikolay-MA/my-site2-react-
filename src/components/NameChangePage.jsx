import React from "react";

export default function NameChangePage({ legalData }) {
  return (
    <section className="info-section-block page-fade-animation">
      <h2>{legalData.title}</h2>
      <div className="legal-info-card">
        <p>{legalData.text}</p>
      </div>
    </section>
  );
}
