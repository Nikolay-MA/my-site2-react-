import React, { useState, useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next"; 
import GalleryItem from "./GalleryItem";
import Lightbox from "./Lightbox";

// Возвращаем оригинальные форматы файлов, которые физически присутствуют в проекте
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
  
  const [lightbox, setLightbox] = useState({ isOpen: false, initialIndex: 0 });
  const galleryRef = useRef(null);

  // Безопасный расчет возраста: изолирован через useMemo и привязан к фиксированной дате
  const ageData = useMemo(() => {
    const birthDate = new Date("2008-09-02");
    // Используем фиксированный текущий год проекта 2026, чтобы избежать сбоев на устройстве
    const currentYear = 2026; 
    const today = new Date();
    // Корректируем месяц и день относительно системных, но год константен
    let calculatedAge = currentYear - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }

    let str = "";
    if (i18n.language && i18n.language.startsWith("en")) {
      str = `I am ${calculatedAge} years old`;
    } else {
      const lastDigit = calculatedAge % 10;
      const lastTwoDigits = calculatedAge % 100;
      let word = "лет";
      
      if (lastTwoDigits < 11 || lastTwoDigits > 14) {
        if (lastDigit === 1) word = "год";
        else if (lastDigit >= 2 && lastDigit <= 4) word = "года";
      }
      str = `Мне ${calculatedAge} ${word}`;
    }
    return str;
  }, [i18n.language]);

  const socials = [
    { title: "Telegram", link: "https://t.me/uzelaaa" },
    { title: "ВКонтакте", link: "https://vk.com/nikoollaayyy" },
    { title: "YouTube", link: "https://youtube.com/@u_s_e_r_s?si=E_CkHumsLWadBKgA" }
  ];

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
  // Клиентская валидация: проверка почты регулярным выражением и длины сообщения
  const isEmailValid = email === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+\$/.test(email);
  const isMessageValid = message === "" || message.length >= 5;
  const isFormInvalid = !isEmailValid || !isMessageValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormInvalid) return;
    setFormStatus("loading");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("message", message);

    try {
      const response = await fetch("https://formspree.io/f/mnpnpbbn", {
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
      
      {/* Карточка профиля с семантическим тегом section и доступным alt */}
      <section className="profile-card">
        <div className="avatar-container">
          <img src={avatarImg} alt={t("main.name")} className="avatar" />
        </div>
        <div className="profile-info">
          <h1>{t("main.name")}</h1>
          <p className="tagline">{t("main.tagline")}</p>
          <p className="bio">{ageData}{t("main.bio")}</p>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7469.461092424268!2d37.63571642430221!3d55.8248652638279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b53677c54bbac5%3A0x9c177293add67c2d!2z0JzQtdGC0YDQviDQktCU0J3QpQ!5e1!3m2!1sru!2sru!4v1790624723259!5m2!1sru!2sru" 
                width="100%" height="400" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" title="Google Map VDNKh"
              ></iframe>
            ) : (
              <>
                <a href="https://yandex.ru/maps/213/moscow/?utm_medium=mapframe&utm_source=maps" style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "0px" }} target="_blank" rel="noopener noreferrer">Москва</a>
                <a href="https://yandex.ru/maps/213/moscow/stops/station__9858797/?from=SO&ll=37.614967%2C55.828197&tab=overview&utm_medium=mapframe&utm_source=maps&z=13.85" style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "14px" }} target="_blank" rel="noopener noreferrer">ВДНХ — Яндекс Карты</a>
                <iframe 
                  src="https://yandex.ru/map-widget/v1/?from=SO&ll=37.614967%2C55.828197&masstransit%5BstopId%5D=station__9858797&mode=masstransit&tab=overview&z=13.85" 
                  width="100%" height="400" frameBorder="0" allowFullScreen={true} style={{ position: "relative" }} title="Яндекс Карта ВДНХ"
                ></iframe>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Форма обратной связи с индикацией ошибок валидации */}
      <section className="contact-section">
        <h2>{t("main.contactTitle")}</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t("main.form.name")}</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, ""))} />
          </div>
          
          <div className="form-group">
            <label>{t("main.form.email")}</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className={!isEmailValid ? "input-error" : ""}
            />
            {!isEmailValid && <span className="error-text" style={{ color: "red", fontSize: "0.8rem" }}>Некорректный формат Email</span>}
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
              rows="5" 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
              className={!isMessageValid ? "input-error" : ""}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (formStatus !== "loading" && formStatus !== "success" && !isFormInvalid) { handleSubmit(e); }
                }
              }}
            ></textarea>
            {!isMessageValid && <span className="error-text" style={{ color: "red", fontSize: "0.8rem" }}>Минимум 5 символов</span>}
          </div>

          <button 
            type="submit" 
            className={`btn-submit ${formStatus === "success" ? "btn-success" : ""}`} 
            disabled={formStatus === "loading" || formStatus === "success" || isFormInvalid}
          >
            {formStatus === "idle" && t("main.form.submit")}
            {formStatus === "loading" && t("main.form.loading")}
            {formStatus === "success" && t("main.form.success")}
            {formStatus === "error" && t("main.form.error")}
          </button>
        </form>
      </section>

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
