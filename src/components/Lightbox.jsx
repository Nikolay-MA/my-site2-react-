import React from "react";

export default function Lightbox({ src, caption, onClose }) {
  return (
    <div className="lightbox" style={{ display: "flex" }} onClick={onClose}>
      <span className="lightbox-close" onClick={onClose}>&times;</span>
      <img 
        className="lightbox-content" 
        src={src} 
        alt={caption} 
        onClick={(e) => e.stopPropagation()} // Чтобы окно не закрывалось при клике на саму картинку
      />
      <div id="lightbox-caption">{caption}</div>
    </div>
  );
}
