import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

export default function Lightbox({ images, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handlePrev = (e) => {
    if (e) e.stopPropagation(); // Предотвращаем закрытие при клике на штору
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? images.length - 1 : prevIdx - 1));
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation(); // Предотвращаем закрытие при клике на штору
    setCurrentIndex((prevIdx) => (prevIdx === images.length - 1 ? 0 : prevIdx + 1));
  };

  // Обработка прокрутки колесика мыши (Wheel)
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 10 && Math.abs(e.deltaX) < 10) return;
      
      if (e.deltaY > 0 || e.deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    };

    const lightboxElem = document.querySelector(".lightbox");
    if (lightboxElem) {
      lightboxElem.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (lightboxElem) lightboxElem.removeEventListener("wheel", handleWheel);
    };
  }, [currentIndex]);
  // Обработка клавиатуры (стрелки и Esc)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev(e);
      if (e.key === "ArrowRight") handleNext(e);
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images, currentIndex]);

  // Обработка свайпов на мобильных экранах
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches.clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches.clientX;
    const diffX = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50;

    if (Math.abs(diffX) > swipeThreshold) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  if (!images || images.length === 0) return null;
  const currentImage = images[currentIndex];

  const lightboxContent = (
    <div 
      className="lightbox" 
      onClick={onClose} /* Клик по пустому пространству сверху/снизу закроет окно */
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Кнопка закрытия */}
      <span className="lightbox-close" onClick={onClose}>&times;</span>
      
      {/* Интерактивные клик-зоны Telegram-стиля (шторы) */}
      <div className="lightbox-curtain curtain-left" onClick={handlePrev}></div>
      <div className="lightbox-curtain curtain-right" onClick={handleNext}></div>

      {/* Контейнер картинки: e.stopPropagation() защищает от закрытия при клике на саму картинку */}
      <div className="lightbox-media-wrapper" onClick={(e) => e.stopPropagation()}>
        <img 
          className="lightbox-content" 
          src={currentImage.src} 
          alt={currentImage.caption} 
        />
      </div>

      {/* Подпись к фото */}
      <div id="lightbox-caption" onClick={(e) => e.stopPropagation()}>
        {currentImage.caption}
      </div>
    </div>
  );

  return ReactDOM.createPortal(lightboxContent, document.body);
}
