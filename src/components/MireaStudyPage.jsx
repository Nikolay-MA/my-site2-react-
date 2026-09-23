import React from "react";

const techStack = [
  { name: "Python", desc: "Основы ИИ и анализа данных", color: "linear-gradient(135deg, #306998, #FFD43B)", textLight: true },
  { name: "C++", desc: "Алгоритмы и основы ООП", color: "linear-gradient(135deg, #00599C, #5E97D0)", textLight: true },
  { name: "C#", desc: "Компилируемые приложения", color: "linear-gradient(135deg, #178600, #283593)", textLight: true },
  { name: "Java", desc: "Промышленная разработка (2 курс)", color: "linear-gradient(135deg, #E76F51, #F4A261)", textLight: true },
  { name: "SQL", desc: "Управление базами данных (2 курс)", color: "linear-gradient(135deg, #00758F, #F29111)", textLight: true },
  { name: "Prompting", desc: "Управление нейросетями и ИИ", color: "linear-gradient(135deg, #9b59b6, #8e44ad)", textLight: true }
];

export default function MireaStudyPage() {
  return (
    <section className="info-section-block page-fade-animation">
      <h2>Учеба в МИРЭА</h2>
      <div className="legal-info-card">
        <h3>МИРЭА — Российский технологический университет</h3>
        <p style={{ marginBottom: "12px" }}><strong>Институт:</strong> Кибербезопасности и цифровых технологий</p>
        <p style={{ marginBottom: "25px" }}><strong>Направление:</strong> Искусственный Интеллект & Анализ Данных</p>
        <h3 style={{ marginTop: "30px", marginBottom: "15px" }}>Изучаемый стек технологий</h3>
        <p style={{ marginBottom: "25px" }}>
          Сейчас я параллельно осваиваю фундаментальную базу: разработку на <strong>C++</strong>, 
          <strong>C#</strong> и скриптовый язык <strong>Python</strong>. На втором курсе начнется 
          углубление в веб-инженерию через <strong>Java</strong> и базы данных <strong>SQL</strong>. 
          Кроме того, как специалист по ИИ, я активно учусь профессионально взаимодействовать с моделями и 
          проектировать эффективные <strong>промты для нейросетей</strong>.
        </p>

        {/* Сетка бейджей с технологиями */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", 
          gap: "15px", 
          marginTop: "20px" 
        }}>
          {techStack.map((tech, idx) => (
            <div key={idx} style={{
              background: tech.color,
              color: tech.textLight ? "#ffffff" : "#231f20",
              padding: "20px",
              borderRadius: "16px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "default"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.05)";
            }}>
              <h4 style={{ fontSize: "1.4rem", margin: "0 0 6px 0", fontWeight: "700" }}>{tech.name}</h4>
              <p style={{ fontSize: "0.85rem", margin: 0, opacity: 0.9, lineHeight: "1.3" }}>{tech.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
