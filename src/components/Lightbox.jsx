import React from "react";
import ReactDOM from "react-dom"; // Импортируем ReactDOM для работы с порталами

export default function Lightbox({ src, caption, onClose }) {
  const lightboxContent = (
    <div className="lightbox" onClick={onClose}>
      <span className="lightbox-close" onClick={onClose}>&times;</span>
      <img 
        className="lightbox-content" 
        src={src} 
        alt={caption} 
        onClick={(e) => e.stopPropagation()} // Чтобы окно не закрывалось при клике на само фото
      />
      <div id="lightbox-caption" onClick={(e) => e.stopPropagation()}>
        {caption}
      </div>
    </div>
  );

  // Рендерим лайтбокс напрямую в document.body, в самый корень веб-страницы
  return ReactDOM.createPortal(lightboxContent, document.body);
}
