import React from "react";

export default function GalleryItem({ src, caption, onOpenLightbox }) {
  return (
    <div className="gallery-item" onClick={() => onOpenLightbox(src, caption)}>
      <img src={src} alt={caption} />
      <div className="gallery-overlay">
        <span>{caption}</span>
      </div>
    </div>
  );
}
