import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import GalleryItem from "./GalleryItem";
import Lightbox from "./Lightbox";

// Импорт изображений
import flagImg from "./Фото/image_c58R0X.webp";
import mireaImg from "./Фото/image_qplLkv.webp";
import currentPhotoImg from "./Фото/image_kt9XQv.webp";

export default function MireaStudyPage() {
  const { t } = useTranslation();
  
  // Состояние лайтбокса: храним флаг открытия и индекс стартовой фотографии
  const [lightbox, setLightbox] = useState({ isOpen: false, initialIndex: 0 });

  // Массив технологий
  const techStack = [
    { name: "Python", desc: t("mirea.tech.py"), color: "linear-gradient(135deg, #306998, #FFD43B)", textLight: true },
    { name: "C++", desc: t("mirea.tech.cpp"), color: "linear-gradient(135deg, #00599C, #5E97D0)", textLight: true },
    { name: "C#", desc: t("mirea.tech.cs"), color: "linear-gradient(135deg, #178600, #283593)", textLight: true },
    { name: "Java", desc: t("mirea.tech.java"), color: "linear-gradient(135deg, #E76F51, #F4A261)", textLight: true },
    { name: "SQL", desc: t("mirea.tech.sql"), color: "linear-gradient(135deg, #00758F, #F29111)", textLight: true },
    { name: "Prompting", desc: t("mirea.tech.prompt"), color: "linear-gradient(135deg, #9b59b6, #8e44ad)", textLight: true }
  ];

  // Массив фотографий для галереи МИРЭА
  const mireaPhotos = [
    { caption: t("mirea.captions.campus1"), src: mireaImg },
    { caption: t("mirea.captions.campus2"), src: currentPhotoImg },
    { caption: t("mirea.captions.flag"), src: flagImg }
  ];

  return (
    <section className="info-section-block page-fade-animation">
      <h2>{t("mirea.title")}</h2>
      <div className="legal-info-card">
        <h3>{t("mirea.sub")}</h3>
        <p style={{ marginBottom: "12px" }}><strong>{t("mirea.institute")}</strong> {t("mirea.instVal")}</p>
        <p style={{ marginBottom: "12px" }}><strong>{t("mirea.direction")}</strong> {t("mirea.dirVal")}</p>
        <p style={{ marginBottom: "25px" }}><strong>{t("mirea.educationForm")}</strong> {t("mirea.educationFormVal")}</p>
        
        <h3 style={{ marginTop: "30px", marginBottom: "15px" }}>{t("mirea.gallery")}</h3>
        <div className="gallery-grid" style={{ marginBottom: "30px" }}>
          {mireaPhotos.map((item, idx) => (
            <GalleryItem 
              key={idx} 
              src={item.src} 
              caption={item.caption} 
              // Передаем порядковый индекс кликнутой фотографии в галерее МИРЭА
              onOpenLightbox={() => setLightbox({ isOpen: true, initialIndex: idx })}
            />
          ))}
        </div>

        <h3 style={{ marginTop: "30px", marginBottom: "15px" }}>{t("mirea.stackTitle")}</h3>
        <p style={{ marginBottom: "25px" }}>{t("mirea.stackDesc")}</p>

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

      {/* Лайтбокс с массивом картинок МИРЭА */}
      {lightbox.isOpen && (
        <Lightbox 
          images={mireaPhotos} 
          initialIndex={lightbox.initialIndex} 
          onClose={() => setLightbox({ isOpen: false, initialIndex: 0 })} 
        />
      )}
    </section>
  );
}
