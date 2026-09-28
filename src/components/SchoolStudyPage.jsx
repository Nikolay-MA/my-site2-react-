import React from "react";
import { useTranslation } from "react-i18next";

export default function SchoolStudyPage({ schoolData }) {
  const { t } = useTranslation();

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
          <h3>{t("school.birthDateVal") === "2 сентября 2008 года" ? schoolData.title : "School №1415 \"Ostankino\""}</h3>
          <p><strong>{t("school.birthDate")}</strong> {t("school.birthDateVal")}</p>
          <p><strong>{t("school.period")}</strong> {t("school.periodVal")}</p>
          <p><strong>{t("school.director")}</strong> {t("school.birthDateVal") === "2 сентября 2008 года" ? schoolData.director : "Ponomarev Alexey Leonidovich"}</p>
          <p><strong>{t("school.direction")}</strong> {t("school.birthDateVal") === "2 сентября 2008 года" ? schoolData.classType : "Physics and Mathematics Class (Grades 10–11)"}</p>
        </div>

        {/* Спортивные секции */}
        <div className="school-info-card">
          <h3>{t("school.sportsTitle")}</h3>
          <p>{t("school.sportsDesc")}</p>
          <ul className="sports-bullet-list">
            {t("school.birthDateVal") === "2 сентября 2008 года" 
              ? schoolData.sports.map((sport, i) => <li key={i}>{sport}</li>)
              : ["Sambo (Grades 9–10)", "Football", "Karate"].map((sport, i) => <li key={i}>{sport}</li>)
            }
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
