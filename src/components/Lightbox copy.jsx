import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

export default function Lightbox({ images, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [bgOpacity, setBgOpacity] = useState(0.97);
  
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const touchEndY = useRef(0);
  
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  const startTouchDistance = useRef(0);
  const startZoom = useRef(1);
  const isPinching = useRef(false);
  const lastTap = useRef(0);

  const isDesktop = () => {
    return window.matchMedia("(pointer: fine)").matches;
  };

  const getTouchDistance = (touches) => {
    if (touches.length < 2) return 0;
    return Math.hypot(
      touches[0].clientX - touches[1].clientX,
      touches[0].clientY - touches[1].clientY
    );
  };

  const resetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setBgOpacity(0.97);
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    resetZoom();
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? images.length - 1 : prevIdx - 1));
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    resetZoom();
    setCurrentIndex((prevIdx) => (prevIdx === images.length - 1 ? 0 : prevIdx + 1));
  };

  // ЖЕСТКИЕ ГРАНИЦЫ: Картинка никогда не выйдет за пределы своих краев
  const clampPosition = (newX, newY, currentZoom) => {
    const imgElem = document.querySelector(".lightbox-content");
    if (!imgElem || currentZoom <= 1) return { x: 0, y: 0 };

    const wRatio = imgElem.naturalWidth / imgElem.clientWidth;
    const hRatio = imgElem.naturalHeight / imgElem.clientHeight;
    const maxRatio = Math.max(wRatio, hRatio);
    
    const visibleWidth = imgElem.naturalWidth / maxRatio;
    const visibleHeight = imgElem.naturalHeight / maxRatio;

    const overflowX = visibleWidth * currentZoom - window.innerWidth;
    const overflowY = visibleHeight * currentZoom - window.innerHeight;

    const limitX = overflowX > 0 ? overflowX / 2 : 0;
    const limitY = overflowY > 0 ? overflowY / 2 : 0;

    return {
      x: overflowX > 0 ? Math.min(Math.max(newX, -limitX), limitX) : 0,
      y: overflowY > 0 ? Math.min(Math.max(newY, -limitY), limitY) : 0
    };
  };

  const calculateZoomToPoint = (clientX, clientY, targetZoom) => {
    const imgElem = document.querySelector(".lightbox-content");
    if (!imgElem) return { x: 0, y: 0 };

    const rect = imgElem.getBoundingClientRect();
    const imgCenterX = rect.left + rect.width / 2;
    const imgCenterY = rect.top + rect.height / 2;

    const offsetX = clientX - imgCenterX;
    const offsetY = clientY - imgCenterY;

    const rawX = position.x - offsetX * (targetZoom / zoom - 1);
    const rawY = position.y - offsetY * (targetZoom / zoom - 1);

    return clampPosition(rawX, rawY, targetZoom);
  };
  const handleImageClick = (e) => {
    e.stopPropagation();
    if (!isDesktop()) return; 
    if (hasMoved.current) return; 

    if (zoom > 1) {
      resetZoom();
    } else {
      const targetZoom = 2.5;
      const newPos = calculateZoomToPoint(e.clientX, e.clientY, targetZoom);
      setZoom(targetZoom); 
      setPosition(newPos);
    }
  };

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      const imgElem = document.querySelector(".lightbox-content");
      if (!imgElem) return;

      const isMouseOverImage = e.target === imgElem || imgElem.contains(e.target);

      if (isMouseOverImage) {
        setZoom((prevZoom) => {
          const newZoom = prevZoom - e.deltaY * 0.005;
          const clampedZoom = Math.min(Math.max(newZoom, 1), 5);
          
          if (clampedZoom === 1) {
            setPosition({ x: 0, y: 0 });
          } else {
            const newPos = calculateZoomToPoint(e.clientX, e.clientY, clampedZoom);
            setPosition(newPos);
          }
          return clampedZoom;
        });
      } else {
        if (e.deltaY > 0 || e.deltaX > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    };

    const lightboxElem = document.querySelector(".lightbox");
    if (lightboxElem) {
      lightboxElem.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (lightboxElem) lightboxElem.removeEventListener("wheel", handleWheel);
    };
  }, [currentIndex, zoom, position]);

  const handleMouseDown = (e) => {
    if (zoom <= 1 || !isDesktop()) return;
    e.preventDefault(); 
    isDragging.current = true;
    hasMoved.current = false;
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || zoom <= 1 || !isDesktop()) return;
    const currentX = e.clientX - dragStart.current.x;
    const currentY = e.clientY - dragStart.current.y;
    hasMoved.current = true;
    setPosition(clampPosition(currentX, currentY, zoom));
  };

  const handleMouseUp = () => { isDragging.current = false; };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev(e);
      if (e.key === "ArrowRight") handleNext(e);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images, currentIndex]);

  const handleTouchStart = (e) => {
    if (isDesktop()) return;

    if (e.touches.length === 2) {
      isPinching.current = true;
      startTouchDistance.current = getTouchDistance(e.touches);
      startZoom.current = zoom;
    } else if (e.touches.length === 1) {
      isPinching.current = false;
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      
      const now = Date.now();
      if (now - lastTap.current < 300) {
        e.preventDefault();
        if (zoom > 1) {
          resetZoom();
        } else {
          const targetZoom = 2.5;
          const newPos = calculateZoomToPoint(e.touches[0].clientX, e.touches[0].clientY, targetZoom);
          setZoom(targetZoom);
          setPosition(newPos);
        }
        return;
      }
      lastTap.current = now;

      isDragging.current = true;
      dragStart.current = { x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y };
    }
  };

  const handleTouchMove = (e) => {
    if (isDesktop()) return;

    if (e.touches.length === 2 && isPinching.current) {
      e.preventDefault();
      const currentDistance = getTouchDistance(e.touches);
      if (currentDistance === 0) return;
      
      const isMobilePhone = window.innerWidth <= 680;
      
      setZoom(() => {
        // На телефонах скорость строго равна движению пальцев (factor = пропорция расстояния)
        // На планшетах сохраняется старый расчет с коэффициентом 2.2
        const factor = isMobilePhone 
          ? (currentDistance / startTouchDistance.current)
          : 1 + (currentDistance / startTouchDistance.current - 1) * 2.2;
          
        const newZoom = startZoom.current * factor;
        const maxZoomLimit = isMobilePhone ? 16 : 12;
        const clampedZoom = Math.min(Math.max(newZoom, 1), maxZoomLimit);
        
        if (clampedZoom === 1) {
          setPosition({ x: 0, y: 0 });
        } else {
          setPosition((prevPos) => clampPosition(prevPos.x, prevPos.y, clampedZoom));
        }
        return clampedZoom;
      });
    } else if (e.touches.length === 1 && isDragging.current) {
      const deltaX = e.touches[0].clientX - dragStart.current.x;
      const deltaY = e.touches[0].clientY - dragStart.current.y;

      if (zoom > 1) {
        setPosition(clampPosition(deltaX, deltaY, zoom));
      } else {
        setPosition({ x: 0, y: deltaY });
        const newOpacity = Math.max(0.2, 0.97 - Math.abs(deltaY) / 600);
        setBgOpacity(newOpacity);
      }
    }
  };

  const handleTouchEnd = (e) => {
    if (isDesktop()) return;
    if (e.touches.length < 2) isPinching.current = false;
    isDragging.current = false;

    if (zoom > 1) return;

    if (e.changedTouches.length === 1) {
      touchEndX.current = e.changedTouches[0].clientX;
      touchEndY.current = e.changedTouches[0].clientY;
      const diffX = touchStartX.current - touchEndX.current;
      const diffY = touchStartY.current - touchEndY.current;

      if (Math.abs(diffX) > 60 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
          handleNext();
        } else {
          handlePrev();
        }
        return;
      }

      if (Math.abs(position.y) > 120) {
        onClose();
      } else {
        resetZoom();
      }
    }
  };
  if (!images || images.length === 0) return null;
  const currentImage = images[currentIndex];

  return ReactDOM.createPortal(
    <div 
      className="lightbox" 
      onClick={(e) => {
        const imgElem = document.querySelector(".lightbox-content");
        
        if (imgElem && imgElem.contains(e.target)) {
          handleImageClick(e);
          return;
        }

        if (zoom === 1) {
          if (e.target.id === "lightbox-caption") return;

          const halfWidth = window.innerWidth / 2;
          if (e.clientX < halfWidth) {
            handlePrev(e);
          } else {
            handleNext(e);
          }
        } else {
          onClose();
        }
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ backgroundColor: `rgba(10, 11, 14, ${bgOpacity})` }}
    >
      <span className={`lightbox-close ${zoom > 1 ? "hidden-on-zoom" : ""}`} onClick={onClose}>&times;</span>
      
      <div 
        className={`lightbox-media-wrapper ${zoom > 1 ? "zoomed" : ""}`}
        onMouseDown={handleMouseDown}
      >
        {zoom === 1 && (
          <>
            <div className="lightbox-mobile-curtain mobile-curtain-left" onClick={(e) => { e.stopPropagation(); handlePrev(e); }}></div>
            <div className="lightbox-mobile-curtain mobile-curtain-right" onClick={(e) => { e.stopPropagation(); handleNext(e); }}></div>
          </>
        )}

        <img 
          className={`lightbox-content ${zoom > 1 ? "lightbox-zoomed" : "lightbox-normal"} ${isDragging.current ? "is-dragging" : ""}`} 
          src={currentImage.src} 
          alt={currentImage.caption} 
          style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})` }}
        />

        {zoom === 1 && currentImage.caption && currentImage.caption.trim() !== "" && (
          <div id="lightbox-caption">
            {currentImage.caption}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
