import React from "react";
import { useTranslation } from "react-i18next";

export default function ProjectsPage() {
  const { t } = useTranslation();

  return (
    <section className="info-section-block page-fade-animation">
      <h2>{t("projects.title")}</h2>
      <div className="legal-info-card">
        <p>{t("projects.desc")}</p>
      </div>
    </section>
  );
}
