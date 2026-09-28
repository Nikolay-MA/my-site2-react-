import React from "react";
import { useTranslation } from "react-i18next";

export default function NameChangePage({ legalData }) {
  const { t } = useTranslation();

  return (
    <section className="info-section-block page-fade-animation">
      <h2>{t("nameChange.title")}</h2>
      <div className="legal-info-card">
        <p>{t("nameChange.text")}</p>
      </div>
    </section>
  );
}
