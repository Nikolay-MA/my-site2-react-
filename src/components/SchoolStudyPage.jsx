import React from "react";
import { useTranslation } from "react-i18next";

export default function SchoolStudyPage() {
  const { t } = useTranslation();

  // Получаем локализованные массивы секций напрямую из JSON
  const sportsList = t("school.sports", { returnObjects: true }) || [];
  const extraList = t("school.extracurricular", { returnObjects: true }) || [];

  return (
    <section className="info-section-block page-fade-animation" style={{ width: "100%" }}>
      <h2>{t("school.title")}</h2>
      
      <div className="school-grid-layout" style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(45%, 1fr))", 
        gap: "24px",
        width: "100%" 
      }}>
        
        {/* Общая информация о школе */}
        <div className="school-info-card">
          <h3>{t("school.title")}</h3>
          <p><strong>{t("school.birthDate")}</strong> {t("school.birthDateVal")}</p>
          <p><strong>{t("school.period")}</strong> {t("school.periodVal")}</p>
          <p><strong>{t("school.director")}</strong> {t("school.directorVal")}</p>
          <p><strong>{t("school.direction")}</strong> {t("school.classType")}</p>
        </div>

        {/* Спортивные секции */}
        <div className="school-info-card">
          <h3>{t("school.sportsTitle")}</h3>
          <p>{t("school.sportsDesc")}</p>
          <ul className="sports-bullet-list">
            {sportsList.map((sport, i) => (
              <li key={i}>{sport}</li>
            ))}
          </ul>
        </div>

        {/* Внеурочная деятельность */}
        <div className="school-info-card">
          <h3>{t("school.extracurricularTitle")}</h3>
          <p>{t("school.extracurricularDesc")}</p>
          <ul className="sports-bullet-list">
            {extraList.map((activity, i) => (
              <li key={i}>{activity}</li>
            ))}
          </ul>
        </div>

        {/* Карточка оценок ОГЭ */}
        <div className="school-info-card score-card">
          <h3>{t("school.ogeTitle")}</h3>
          <ul className="scores-list">
            <li><span className="subject">{t("school.mathShort")}:</span> <span className="score badge-high">{t("school.excellent")}</span></li>
            <li><span className="subject">{t("school.physics")}:</span> <span className="score badge-high">{t("school.excellent")}</span></li>
            <li><span className="subject">{t("school.inf")}:</span> <span className="score badge-high">{t("school.excellent")}</span></li>
            <li><span className="subject">{t("school.rus")}:</span> <span className="score badge-medium">{t("school.good")}</span></li>
          </ul>
        </div>

        {/* Карточка оценок ЕГЭ */}
        <div className="school-info-card score-card">
          <h3>{t("school.eegTitle")}</h3>
          <ul className="scores-list">
            <li><span className="subject">{t("school.math")}:</span> <span className="score badge-high">80 {t("school.scores")}</span></li>
            <li><span className="subject">{t("school.inf")}:</span> <span className="score badge-high">80 {t("school.scores")}</span></li>
            <li><span className="subject">{t("school.rus")}:</span> <span className="score badge-medium">69 {t("school.scores")}</span></li>
          </ul>
        </div>

      </div>
    </section>
  );
}
