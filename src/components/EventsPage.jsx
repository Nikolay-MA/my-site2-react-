import React from "react";
import { useTranslation } from "react-i18next";

export default function EventsPage() {
  const { t } = useTranslation();

  return (
    <section className="info-section-block page-fade-animation">
      <h2>{t("events.title")}</h2>
      <div className="legal-info-card">
        <p>{t("events.desc")}</p>
      </div>
    </section>
  );
}
