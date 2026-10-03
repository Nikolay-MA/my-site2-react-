import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useGesture } from "@use-gesture/react";
import { animated, useSpring } from "@react-spring/web";

export default function Lightbox({ images, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [bgOpacity, setBgOpacity] = useState(0.97);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const lastTap = useRef(0);

  const isDesktop = () => window.matchMedia("(pointer: fine)").matches;
  const isMobilePhone = () => window.innerWidth <= 680;

  // Настройка пружины с максимальным приоритетом производительности
  const [{ x, y, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    config: { precision: 0.001, mass: 1, tension: 300, friction: 32 },
  }));

  // Физический стейт без реактивности (защита от лагов)
  const state = useRef({ x: 0, y: 0, scale: 1 });

  const resetZoom = (immediate = false) => {
    state.current = { x: 0, y: 0, scale: 1 };
    setBgOpacity(0.97);
    api.start({ x: 0, y: 0, scale: 1, immediate });
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    resetZoom(true);
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? images.length - 1 : prevIdx - 1));
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    resetZoom(true);
    setCurrentIndex((prevIdx) => (prevIdx === images.length - 1 ? 0 : prevIdx + 1));
  };
  // Нативный расчет физического расстояния между тачами
  const getTouchDist = (touches) => {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const clampPosition = (targetX, targetY, targetScale) => {
    const imgElem = document.querySelector(".lightbox-content");
    if (!imgElem || targetScale <= 1) return { x: 0, y: 0 };

    const wRatio = imgElem.naturalWidth / imgElem.clientWidth;
    const hRatio = imgElem.naturalHeight / imgElem.clientHeight;
    const maxRatio = wRatio > hRatio ? wRatio : hRatio;

    const visibleWidth = imgElem.naturalWidth / maxRatio;
    const visibleHeight = imgElem.naturalHeight / maxRatio;

    const overflowX = visibleWidth * targetScale - window.innerWidth;
    const overflowY = visibleHeight * targetScale - window.innerHeight;

    const limitX = overflowX > 0 ? overflowX / 2 : 0;
    const limitY = overflowY > 0 ? overflowY / 2 : 0;

    return {
      x: overflowX > 0 ? Math.min(Math.max(targetX, -limitX), limitX) : 0,
      y: overflowY > 0 ? Math.min(Math.max(targetY, -limitY), limitY) : 0,
    };
  };

  const calculateZoomToPoint = (clientX, clientY, targetScale) => {
    const imgElem = document.querySelector(".lightbox-content");
    if (!imgElem) return { x: 0, y: 0 };

    const rect = imgElem.getBoundingClientRect();
    const imgCenterX = rect.left + rect.width / 2 - state.current.x;
    const imgCenterY = rect.top + rect.height / 2 - state.current.y;

    const offsetX = clientX - imgCenterX;
    const offsetY = clientY - imgCenterY;

    const rawX = state.current.x - offsetX * (targetScale / state.current.scale - 1);
    const rawY = state.current.y - offsetY * (targetScale / state.current.scale - 1);

    return clampPosition(rawX, rawY, targetScale);
  };
  const bindGestures = useGesture(
    {
      onDrag: ({ pinching, cancel, delta: [dx, dy], movement: [mx, my], active }) => {
        if (pinching) return cancel(); // Блокируем драг, если активен пинч

        if (state.current.scale > 1) {
          const targetX = state.current.x + dx;
          const targetY = state.current.y + dy;
          const clamped = clampPosition(targetX, targetY, state.current.scale);

          state.current.x = clamped.x;
          state.current.y = clamped.y;

          api.start({ x: clamped.x, y: clamped.y, immediate: active });
        } else {
          // Свайп вниз на масштабе 1 для закрытия
          if (!isDesktop()) {
            api.start({ y: my, immediate: active });
            const newOpacity = Math.max(0.2, 0.97 - Math.abs(my) / 600);
            setBgOpacity(newOpacity);
          }
        }
      },
      onDragEnd: () => {
        if (state.current.scale > 1) return;
        if (Math.abs(y.get()) > 120) {
          onClose();
        } else {
          resetZoom();
        }
      },
    },
    {
      drag: { filterTaps: true }
    }
  );
  // Рефы для точечного замера без участия стейта React
  const pinchMemo = useRef({ startScale: 1, startDist: 1, startX: 0, startY: 0, ox: 0, oy: 0 });

  const handleTouchStart = (e) => {
    if (isDesktop()) return;

    if (e.touches.length === 2) {
      // Инициализация нативного пинча 1:1
      const dist = getTouchDist(e.touches);
      if (dist === 0) return;

      const ox = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const oy = (e.touches[0].clientY + e.touches[1].clientY) / 2;

      const imgElem = document.querySelector(".lightbox-content");
      let imgCenterX = window.innerWidth / 2;
      let imgCenterY = window.innerHeight / 2;

      if (imgElem) {
        const rect = imgElem.getBoundingClientRect();
        imgCenterX = rect.left + rect.width / 2 - state.current.x;
        imgCenterY = rect.top + rect.height / 2 - state.current.y;
      }

      pinchMemo.current = {
        startScale: state.current.scale,
        startDist: dist,
        startX: state.current.x,
        startY: state.current.y,
        offsetX: ox - imgCenterX,
        offsetY: oy - imgCenterY,
      };
      return;
    }

    if (e.touches.length === 1) {
      const t0 = e.touches[0];
      touchStartX.current = t0.clientX;
      touchStartY.current = t0.clientY;

      const now = Date.now();
      if (now - lastTap.current < 300) {
        e.preventDefault();
        if (state.current.scale > 1) {
          resetZoom();
        } else {
          const targetScale = 2.5;
          const newPos = calculateZoomToPoint(t0.clientX, t0.clientY, targetScale);
          state.current.scale = targetScale;
          state.current.x = newPos.x;
          state.current.y = newPos.y;
          api.start({ scale: targetScale, x: newPos.x, y: newPos.y, immediate: false });
        }
        return;
      }
      lastTap.current = now;
    }
  };

  const handleTouchMove = (e) => {
    if (isDesktop() || e.touches.length !== 2) return;
    
    // Блокируем нативный зум страницы браузером во время пинча
    if (e.cancelable) e.preventDefault();

    const dist = getTouchDist(e.touches);
    if (dist === 0) return;

    const memo = pinchMemo.current;
    
    // Смартфоны: скорость зума строго равна скорости движения пальцев (1:1)
    // Планшеты: добавляем небольшой мультипликатор для больших экранов
    const speedMultiplier = isMobilePhone() ? 1.0 : 1.6;
    const rawFactor = dist / memo.startDist;
    const factor = 1 + (rawFactor - 1) * speedMultiplier;

    const targetScale = Math.min(Math.max(memo.startScale * factor, 1), 8);

    const rawX = memo.startX - memo.offsetX * (targetScale / memo.startScale - 1);
    const rawY = memo.startY - memo.offsetY * (targetScale / memo.startScale - 1);
    const clampedPos = clampPosition(rawX, rawY, targetScale);

    state.current.scale = targetScale;
    state.current.x = clampedPos.x;
    state.current.y = clampedPos.y;

    api.start({
      scale: targetScale,
      x: clampedPos.x,
      y: clampedPos.y,
      immediate: true, // Мгновенная отрисовка на уровне GPU без лагов
    });
  };

  const handleTouchEnd = (e) => {
    if (isDesktop() || state.current.scale > 1 || e.changedTouches.length !== 1) return;
    const ct0 = e.changedTouches[0];
    const diffX = touchStartX.current - ct0.clientX;
    const diffY = touchStartY.current - ct0.clientY;

    if (Math.abs(diffX) > 60 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) handleNext();
      else handlePrev();
    }
  };
  const handleImageClick = (e) => {
    e.stopPropagation();
    if (!isDesktop()) return;

    if (state.current.scale > 1) {
      resetZoom();
    } else {
      const targetScale = 2.5;
      const newPos = calculateZoomToPoint(e.clientX, e.clientY, targetScale);
      state.current.scale = targetScale;
      state.current.x = newPos.x;
      state.current.y = newPos.y;
      api.start({ scale: targetScale, x: newPos.x, y: newPos.y, immediate: false });
    }
  };

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      const imgElem = document.querySelector(".lightbox-content");
      if (!imgElem) return;

      if (e.target === imgElem || imgElem.contains(e.target)) {
        const newZoom = state.current.scale - e.deltaY * 0.005;
        const clampedZoom = Math.min(Math.max(newZoom, 1), 5);

        if (clampedZoom === 1) {
          resetZoom();
        } else {
          const newPos = calculateZoomToPoint(e.clientX, e.clientY, clampedZoom);
          state.current.scale = clampedZoom;
          state.current.x = newPos.x;
          state.current.y = newPos.y;
          api.start({ scale: clampedZoom, x: newPos.x, y: newPos.y, immediate: true });
        }
      } else {
        if (e.deltaY > 0 || e.deltaX > 0) handleNext();
        else handlePrev();
      }
    };

    const lightboxElem = document.querySelector(".lightbox");
    if (lightboxElem) lightboxElem.addEventListener("wheel", handleWheel, { passive: false });
    return () => lightboxElem?.removeEventListener("wheel", handleWheel);
  }, [currentIndex, api]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev(e);
      if (e.key === "ArrowRight") handleNext(e);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images, currentIndex]);

  if (!images || images.length === 0) return null;
  const currentImage = images[currentIndex];
  return ReactDOM.createPortal(
    <div
      className="lightbox"
      {...bindGestures()}
      onClick={(e) => {
        const imgElem = document.querySelector(".lightbox-content");
        if (imgElem && imgElem.contains(e.target)) {
          handleImageClick(e);
          return;
        }
        if (state.current.scale === 1) {
          if (e.target.id === "lightbox-caption") return;
          if (e.clientX < window.innerWidth / 2) handlePrev(e);
          else handleNext(e);
        } else {
          onClose();
        }
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        backgroundColor: `rgba(10, 11, 14, ${bgOpacity})`,
        touchAction: "none",
        willChange: "background-color"
      }}
    >
      <span
        className={`lightbox-close ${state.current.scale > 1 ? "hidden-on-zoom" : ""}`}
        onClick={onClose}
      >
        &times;
      </span>

      <div className={`lightbox-media-wrapper ${state.current.scale > 1 ? "zoomed" : ""}`}>
        {state.current.scale === 1 && (
          <>
            <div
              className="lightbox-mobile-curtain mobile-curtain-left"
              onClick={(e) => { e.stopPropagation(); handlePrev(e); }}
            ></div>
            <div
              className="lightbox-mobile-curtain mobile-curtain-right"
              onClick={(e) => { e.stopPropagation(); handleNext(e); }}
            ></div>
          </>
        )}

        <animated.img
          className={`lightbox-content ${state.current.scale > 1 ? "lightbox-zoomed" : "lightbox-normal"}`}
          src={currentImage.src}
          alt={currentImage.caption}
          style={{
            x,
            y,
            scale,
            willChange: "transform",
          }}
        />

        {state.current.scale === 1 && currentImage.caption && currentImage.caption.trim() !== "" && (
          <div id="lightbox-caption">{currentImage.caption}</div>
        )}
      </div>
    </div>,
    document.body
  );
}
