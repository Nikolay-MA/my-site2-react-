import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom"; // Сохраняем ReactDOM для портала

export default function Lightbox({ images, initialIndex, onClose }) {
  // Управляем индексом текущей активной фотографии
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Функции для листания по кругу
  const handlePrev = (e) => {
    e.stopPropagation(); // Чтобы клик по стрелке не закрывал лайтбокс
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? images.length - 1 : prevIdx - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIdx) => (prevIdx === images.length - 1 ? 0 : prevIdx + 1));
  };

  // Слушатель клавиатуры (Стрелки для листания, Esc для закрытия)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev(e);
      if (e.key === "ArrowRight") handleNext(e);
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images, currentIndex]);

  // Защитная проверка на случай пустых данных
  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  const lightboxContent = (
    <div className="lightbox" onClick={onClose}>
      {/* Кнопка закрытия */}
      <span className="lightbox-close" onClick={onClose}>&times;</span>
      
      {/* Кнопка НАЗАД */}
      <button className="lightbox-arrow lightbox-arrow-left" onClick={handlePrev}>
        &#10094;
      </button>

      {/* Фотография */}
      <img 
        className="lightbox-content" 
        src={currentImage.src} 
        alt={currentImage.caption} 
        onClick={(e) => e.stopPropagation()} 
      />

      {/* Подпись к фото */}
      <div id="lightbox-caption" onClick={(e) => e.stopPropagation()}>
        {currentImage.caption}
      </div>

      {/* Кнопка ВПЕРЕД */}
      <button className="lightbox-arrow lightbox-arrow-right" onClick={handleNext}>
        &#10095;
      </button>
    </div>
  );

  // Возвращаем портал прямо в document.body
  return ReactDOM.createPortal(lightboxContent, document.body);
}
