import React from "react";

export default function SchoolStudyPage({ schoolData }) {
  return (
    <div className="container page-fade-animation">
      <section className="info-section-block">
        <h2>Учеба в школе</h2>
        <div className="school-grid-layout">
          
          {/* Общая информация о школе */}
          <div className="school-info-card">
            <h3>{schoolData.title}</h3>
            <p><strong>Дата рождения:</strong> 2 сентября 2008 года</p>
            <p><strong>Период обучения:</strong> В школу пошел в 2015 году</p>
            <p><strong>Последний директор школы:</strong> {schoolData.director}</p>
            <p><strong>Направление:</strong> {schoolData.classType}</p>
          </div>

          {/* Спортивные секции */}
          <div className="school-info-card">
            <h3>Спортивные занятия</h3>
            <p>За годы учебы я опробовал разные направления физической активности:</p>
            <ul className="sports-bullet-list">
              {schoolData.sports.map((sport, i) => (
                <li key={i}>{sport}</li>
              ))}
            </ul>
          </div>

          {/* Карточка оценок ОГЭ (2024) */}
          <div className="school-info-card score-card">
            <h3>Результаты ОГЭ (2024 год)</h3>
            <ul className="scores-list">
              <li><span className="subject">Математика:</span> <span className="score badge-high">5 (Отлично)</span></li>
              <li><span className="subject">Физика:</span> <span className="score badge-high">5 (Отлично)</span></li>
              <li><span className="subject">Информатика:</span> <span className="score badge-high">5 (Отлично)</span></li>
              <li><span className="subject">Русский язык:</span> <span className="score badge-medium">4 (Хорошо)</span></li>
            </ul>
          </div>

          {/* Карточка оценок ЕГЭ (2026) */}
          <div className="school-info-card score-card">
            <h3>Результаты ЕГЭ (2026 год)</h3>
            <ul className="scores-list">
              <li><span className="subject">Математика (профиль):</span> <span className="score badge-high">80 баллов</span></li>
              <li><span className="subject">Информатика:</span> <span className="score badge-high">80 баллов</span></li>
              <li><span className="subject">Русский язык:</span> <span className="score badge-medium">69 баллов</span></li>
            </ul>
          </div>

        </div>
      </section>
    </div>
  );
}
