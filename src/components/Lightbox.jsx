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
  
  // Переменные для идеального drag-and-drop на ПК
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  // Переменные для мобильного зума (Pinch и Double Tap)
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
      touches.clientX - touches.clientX,
      touches.clientY - touches.clientY
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

  // ПОЛНОСТЬЮ СВОБОДНОЕ ПЕРЕМЕЩЕНИЕ: Убраны все барьеры по вертикали и горизонтали
  const clampPosition = (newX, newY, currentZoom) => {
    const imgElem = document.querySelector(".lightbox-content");
    if (!imgElem || currentZoom <= 1) return { x: 0, y: 0 };

    // Получаем текущие физические размеры картинки на экране (уже с учетом зума)
    const rect = imgElem.getBoundingClientRect();
    
    // Считаем, на сколько пикселей увеличенная картинка шире и выше экрана
    const overflowX = rect.width - window.innerWidth;
    const overflowY = rect.height - window.innerHeight;

    // Лимит сдвига равен половине излишка, деленного на зум (из-за специфики CSS-масштабирования)
    const limitX = overflowX > 0 ? overflowX / (2 * currentZoom) : 0;
    const limitY = overflowY > 0 ? overflowY / (2 * currentZoom) : 0;

    // Если при зуме картинка по высоте стала больше экрана, она будет двигаться на 100% этого объема
    return {
      x: overflowX > 0 ? Math.min(Math.max(newX, -limitX), limitX) : 0,
      y: overflowY > 0 ? Math.min(Math.max(newY, -limitY), limitY) : 0
    };
  };

  // Расчет смещения для зума в точку клика
  const calculateZoomToPoint = (clientX, clientY, targetZoom) => {
    const imgElem = document.querySelector(".lightbox-content");
    if (!imgElem) return { x: 0, y: 0 };

    const rect = imgElem.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const offsetX = clientX - centerX;
    const offsetY = clientY - centerY;

    const rawX = -offsetX * (targetZoom - 1) / targetZoom;
    const rawY = -offsetY * (targetZoom - 1) / targetZoom;

    return clampPosition(rawX, rawY, targetZoom);
  };

  // Зум по клику на ПК
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

  // Обработка колесика мыши (ПК)
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (e.ctrlKey) {
        setZoom((prevZoom) => {
          const newZoom = prevZoom - e.deltaY * 0.002;
          const clampedZoom = Math.min(Math.max(newZoom, 1), 4);
          if (clampedZoom === 1) {
            setPosition({ x: 0, y: 0 });
          } else {
            setPosition((prevPos) => clampPosition(prevPos.x, prevPos.y, clampedZoom));
          }
          return clampedZoom;
        });
        return;
      }
      if (zoom === 1) {
        if (Math.abs(e.deltaY) < 10 && Math.abs(e.deltaX) < 10) return;
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
  }, [currentIndex, zoom]);

  // Движение мышкой (ПК)
  const handleMouseDown = (e) => {
    if (zoom <= 1 || !isDesktop()) return;
    e.preventDefault(); 
    
    isDragging.current = true;
    hasMoved.current = false;
    
    dragStart.current = { 
      x: e.clientX - position.x, 
      y: e.clientY - position.y 
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || zoom <= 1 || !isDesktop()) return;
    
    const currentX = e.clientX - dragStart.current.x;
    const currentY = e.clientY - dragStart.current.y;

    if (Math.abs(currentX - position.x) > 2 || Math.abs(currentY - position.y) > 2) {
      hasMoved.current = true;
    }
    
    setPosition(clampPosition(currentX, currentY, zoom));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Клавиатура (ПК)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev(e);
      if (e.key === "ArrowRight") handleNext(e);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images, currentIndex]);

  // Сенсорные жесты (Телефоны)
  const handleTouchStart = (e) => {
    if (isDesktop()) return;

    if (e.touches.length === 2) {
      isPinching.current = true;
      startTouchDistance.current = getTouchDistance(e.touches);
      startZoom.current = zoom;
    } else if (e.touches.length === 1) {
      isPinching.current = false;
      touchStartX.current = e.touches.clientX;
      touchStartY.current = e.touches.clientY;
      
      const now = Date.now();
      const DOUBLE_TAP_DELAY = 300;
      if (now - lastTap.current < DOUBLE_TAP_DELAY) {
        e.preventDefault();
        if (zoom > 1) {
          resetZoom();
        } else {
          const targetZoom = 2.5;
          const newPos = calculateZoomToPoint(e.touches.clientX, e.touches.clientY, targetZoom);
          setZoom(targetZoom);
          setPosition(newPos);
        }
        return;
      }
      lastTap.current = now;

      isDragging.current = true;
      dragStart.current = { x: e.touches.clientX - position.x, y: e.touches.clientY - position.y };
    }
  };

  const handleTouchMove = (e) => {
    if (isDesktop()) return;

    if (e.touches.length === 2 && isPinching.current) {
      e.preventDefault();
      const currentDistance = getTouchDistance(e.touches);
      if (currentDistance === 0) return;
      const factor = currentDistance / startTouchDistance.current;
      
      setZoom(() => {
        const newZoom = startZoom.current * factor;
        const clampedZoom = Math.min(Math.max(newZoom, 1), 5);
        if (clampedZoom === 1) {
          setPosition({ x: 0, y: 0 });
        } else {
          setPosition((prevPos) => clampPosition(prevPos.x, prevPos.y, clampedZoom));
        }
        return clampedZoom;
      });
    } else if (e.touches.length === 1 && isDragging.current) {
      const deltaX = e.touches.clientX - dragStart.current.x;
      const deltaY = e.touches.clientY - dragStart.current.y;

      if (zoom > 1) {
        setPosition(clampPosition(deltaX, deltaY, zoom));
      } else {
        setPosition({ x: 0, y: deltaY });
        const dragDistance = Math.abs(deltaY);
        const newOpacity = Math.max(0.2, 0.97 - dragDistance / 600);
        setBgOpacity(newOpacity);
      }
    }
  };

  const handleTouchEnd = (e) => {
    if (isDesktop()) return;

    if (e.touches.length < 2) {
      isPinching.current = false;
    }
    isDragging.current = false;

    if (zoom === 1) {
      const deltaY = position.y;
      const CLOSE_THRESHOLD = 120;

      if (Math.abs(deltaY) > CLOSE_THRESHOLD) {
        onClose();
        return;
      } else {
        resetZoom();
      }

      if (e.changedTouches.length === 1) {
        touchEndX.current = e.changedTouches.clientX;
        touchEndY.current = e.changedTouches.clientY;
        const diffX = touchStartX.current - touchEndX.current;
        const diffY = touchStartY.current - touchEndY.current;
        const swipeThreshold = 50;

        if (Math.abs(diffX) > swipeThreshold && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX > 0) {
            handleNext();
          } else {
            handlePrev();
          }
        }
      }
    }
  };
  if (!images || images.length === 0) return null;
  const currentImage = images[currentIndex];

  const lightboxContent = (
    <div 
      className="lightbox" 
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        backgroundColor: `rgba(10, 11, 14, ${bgOpacity})`
      }}
    >
      <span className={`lightbox-close ${zoom > 1 ? "hidden-on-zoom" : ""}`} onClick={onClose}>&times;</span>
      
      {zoom === 1 && (
        <div className="lightbox-desktop-curtains-wrapper">
          <div className="lightbox-curtain curtain-left" onClick={handlePrev}></div>
          <div className="lightbox-curtain curtain-right" onClick={handleNext}></div>
        </div>
      )}

      <div 
        className={`lightbox-media-wrapper ${zoom > 1 ? "zoomed" : ""}`}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
      >
        {zoom === 1 && (
          <>
            <div className="lightbox-mobile-curtain mobile-curtain-left" onClick={handlePrev}></div>
            <div className="lightbox-mobile-curtain mobile-curtain-right" onClick={handleNext}></div>
          </>
        )}

        <img 
          className={`lightbox-content ${zoom > 1 ? "lightbox-zoomed" : "lightbox-normal"} ${isDragging.current ? "is-dragging" : ""}`} 
          src={currentImage.src} 
          alt={currentImage.caption} 
          onClick={handleImageClick}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`
          }}
        />

        {zoom === 1 && currentImage.caption && currentImage.caption.trim() !== "" && (
  <div id="lightbox-caption" onClick={(e) => e.stopPropagation()}>
    {currentImage.caption}
  </div>
)}


      </div>
    </div>
  );

  return ReactDOM.createPortal(lightboxContent, document.body);
}
