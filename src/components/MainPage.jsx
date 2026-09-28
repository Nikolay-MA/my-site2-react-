import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next"; 
import GalleryItem from "./GalleryItem";
import Lightbox from "./Lightbox";

// Импорт изображений
import avatarImg from "./Фото/image_EMD_AL.png";
import graduationImg from "./Фото/image_moFeWh.png";
import vdnkhImg from "./Фото/image_Til1pL.png";
import dachaImg from "./Фото/image_ZwI4Hf.png";

export default function MainPage() {
  const { t, i18n } = useTranslation(); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState("idle");
  
  // Состояние лайтбокса: храним индекс стартовой фотографии
  const [lightbox, setLightbox] = useState({ isOpen: false, initialIndex: 0 });

  const galleryRef = useRef(null);

  // 1. Автоматический расчет возраста на текущий момент
  const birthDate = new Date("2008-09-02");
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  // 2. Формирование строки возраста в зависимости от текущего языка интерфейса
  let ageString = "";
  if (i18n.language && i18n.language.startsWith("en")) {
    ageString = `I am ${age} years old`;
  } else {
    // Склонение слова "год/года/лет" для русского языка
    const lastDigit = age % 10;
    const lastTwoDigits = age % 100;
    let word = "лет";
    
    if (lastTwoDigits < 11 || lastTwoDigits > 14) {
      if (lastDigit === 1) word = "год";
      else if (lastDigit >= 2 && lastDigit <= 4) word = "года";
    }
    ageString = `Мне ${age} ${word}`;
  }

  // Ссылки на социальные сети
  const socials = [
    { title: t("main.socials.tg"), link: "https://t.me" },
    { title: t("main.socials.vk"), link: "https://vk.com" },
    { title: t("main.socials.yt"), link: "https://youtube.com" }
  ];

  // Элементы галереи с локализованными подписями
  const galleryItems = [
    { caption: t("main.captions.graduation"), src: graduationImg },
    { caption: t("main.captions.vdnkh"), src: vdnkhImg },
    { caption: t("main.captions.dacha"), src: dachaImg }
  ];

  useEffect(() => {
    document.title = t("main.title");
  }, [t]);

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    if (!value.startsWith("+7 ")) value = "+7 " + value.replace(/\D/g, "");
    let rawNumbers = value.substring(2).replace(/\D/g, "");
    if (rawNumbers.startsWith("7") || rawNumbers.startsWith("8")) rawNumbers = rawNumbers.substring(1);
    if (rawNumbers.length > 10) rawNumbers = rawNumbers.substring(0, 10);

    let formatted = "+7 ";
    if (rawNumbers.length > 0) formatted += "(" + rawNumbers.substring(0, 3);
    if (rawNumbers.length >= 4) formatted += ") " + rawNumbers.substring(3, 6);
    if (rawNumbers.length >= 7) formatted += "-" + rawNumbers.substring(6, 8);
    if (rawNumbers.length >= 9) formatted += "-" + rawNumbers.substring(8, 10);
    setPhone(formatted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("loading");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("message", message);

    try {
      const response = await fetch("https://formspree.io", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        setFormStatus("success");
        setName(""); setEmail(""); setPhone(""); setMessage("");
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
    setTimeout(() => setFormStatus("idle"), 3000);
  };
  return (
    <div className="page-fade-animation" style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
      
      {/* Карточка профиля */}
      <section className="profile-card">
        <div className="avatar-container">
          <img src={avatarImg} alt={t("main.name")} className="avatar" />
        </div>
        <div className="profile-info">
          <h1>{t("main.name")}</h1>
          <p className="tagline">{t("main.tagline")}</p>
          <p className="bio">{ageString}{t("main.bio")}</p>
          <div className="action-buttons">
            <button onClick={scrollToGallery} className="btn-primary">
              {t("main.cta")}
            </button>
          </div>
          <div className="social-links">
            {socials.map((social, idx) => (
              <a key={idx} href={social.link} className="btn-social" target="_blank" rel="noopener noreferrer">
                {social.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Секция галереи */}
      <section className="gallery-section" ref={galleryRef}>
        <h2>{t("main.galleryHeading")}</h2>
        <div className="gallery-grid">
          {galleryItems.map((item, idx) => (
            <GalleryItem 
              key={idx} 
              src={item.src} 
              caption={item.caption} 
              onOpenLightbox={() => setLightbox({ isOpen: true, initialIndex: idx })}
            />
          ))}
        </div>
      </section>

      {/* Секция с динамической картой */}
      <section className="map-section">
        <h2>{t("main.mapTitle")}</h2>
        <div className="map-wrapper">
          <div style={{ position: "relative", overflow: "hidden" }}>
            {i18n.language && i18n.language.startsWith("en") ? (
              <iframe 
                src="https://google.com" 
                width="100%" height="400" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" title="Google Map VDNKh"
              ></iframe>
            ) : (
              <>
                <a href="https://yandex.ru" style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "0px" }} target="_blank" rel="noopener noreferrer">Москва</a>
                <a href="https://yandex.ru" style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "14px" }} target="_blank" rel="noopener noreferrer">ВДНХ — Яндекс Карты</a>
                <iframe 
                  src="https://yandex.ru" 
                  width="100%" height="400" frameBorder="0" allowFullScreen={true} style={{ position: "relative" }} title="Яндекс Карта ВДНХ"
                ></iframe>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Форма обратной связи */}
      <section className="contact-section">
        <h2>{t("main.contactTitle")}</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t("main.form.name")}</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, ""))} />
          </div>
          
          <div className="form-group">
            <label>{t("main.form.email")}</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          
          <div className="form-group">
            <label>{t("main.form.phone")}</label>
            <input type="text" value={phone} onChange={handlePhoneChange} onFocus={() => !phone && setPhone("+7 ")} placeholder="+7 (___) ___-__-__" />
          </div>
          
          <div className="form-group">
            <label>
              {t("main.form.message")} <span style={{ fontSize: "0.8rem", opacity: 0.7, fontWeight: "normal", marginLeft: "5px" }}>{t("main.form.messageHint")}</span>
            </label>
            <textarea 
              rows="5" value={message} onChange={(e) => setMessage(e.target.value)} 
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (formStatus !== "loading" && formStatus !== "success") { handleSubmit(e); }
                }
              }}
            ></textarea>
          </div>

          <button type="submit" className={`btn-submit ${formStatus === "success" ? "btn-success" : ""}`} disabled={formStatus === "loading" || formStatus === "success"}>
            {formStatus === "idle" && t("main.form.submit")}
            {formStatus === "loading" && t("main.form.loading")}
            {formStatus === "success" && t("main.form.success")}
            {formStatus === "error" && t("main.form.error")}
          </button>
        </form>
      </section>

      {/* Лайтбокс с массивом картинок */}
      {lightbox.isOpen && (
        <Lightbox 
          images={galleryItems} 
          initialIndex={lightbox.initialIndex} 
          onClose={() => setLightbox({ isOpen: false, initialIndex: 0 })} 
        />
      )}
    </div>
  );
}
