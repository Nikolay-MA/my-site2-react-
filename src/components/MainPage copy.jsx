import React, { useState, useEffect, useRef } from "react";
import GalleryItem from "./GalleryItem";
import Lightbox from "./Lightbox";

// 1. ИМПОРТИРУЕМ ВСЕ КАРТИНКИ ИЗ ВАШЕЙ ТЕКУЩЕЙ ПАПКИ ФОТО
import avatarImg from "./Фото/image_EMD_AL.png";
import graduationImg from "./Фото/image_moFeWh.png";
import vdnkhImg from "./Фото/image_Til1pL.png";
import dachaImg from "./Фото/image_ZwI4Hf.png";

// Функция автоматического расчета возраста с правильным склонением слова "лет/года"
const calculateAge = (birthDateString) => {
  const birthDate = new Date(birthDateString);
  const today = new Date();
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  // Если день рождения в этом году еще не наступил, вычитаем 1 год
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  // Подбор правильного слова (год, года, лет)
  const lastDigit = age % 10;
  const lastTwoDigits = age % 100;
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return `${age} лет`;
  if (lastDigit === 1) return `${age} год`;
  if (lastDigit >= 2 && lastDigit <= 4) return `${age} года`;
  return `${age} лет`;
};

const profileConfig = {
  siteTitle: "Николай Маслов | Персональная страница",
  name: "Маслов Николай Александрович",
  tagline: "Студент РТУ МИРЭА | ИИ & Анализ Данных",
  avatar: avatarImg,
  // ИСПРАВЛЕНО: строка bio теперь формируется динамически с вызовом функции calculateAge
  bio: `Мне ${calculateAge("2008-09-02")}, живу в Москве на ВДНХ. С детства обожал Minecraft, пытался запустить свой сервер, что и привело меня в программирование! Сдал ЕГЭ по информатике, изучал JavaScript, Python, HTML/CSS и React. Поступил в Институт кибербезопасности и цифровых технологий РТУ МИРЭА.`,
  socials: [
        { title: "Telegram", link: "https://t.me/uzelaaa" },
        { title: "ВКонтакте", link: "https://vk.com/nikoollaayyy" },
        { title: "YouTube", link: "https://youtube.com/@u_s_e_r_s?si=E_CkHumsLWadBKgA" }
    ],
  galleryHeading: "Моя жизнь, учеба и увлечения",
  items: [
    { caption: "Мой Московский Выпускной", src: graduationImg }, // Подставляем импортированные переменные
    { caption: "Вид на любимый район ВДНХ и Останкино сверху", src: vdnkhImg },
    { caption: "Дача", src: dachaImg }
  ]
};

export default function MainPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState("idle");
  const [lightbox, setLightbox] = useState({ isOpen: false, src: "", caption: "" });

  const galleryRef = useRef(null);

  useEffect(() => {
    document.title = profileConfig.siteTitle;
    
  }, []);

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
      <section className="profile-card">
        <div className="avatar-container">
          <img src={profileConfig.avatar}  alt={profileConfig.name} className="avatar" />
        </div>
        <div className="profile-info">
          <h1>{profileConfig.name}</h1>
          <p className="tagline">{profileConfig.tagline}</p>
          <p className="bio">{profileConfig.bio}</p>
          <div className="action-buttons">
            <button onClick={scrollToGallery} className="btn-primary">
              Посмотреть фото и увлечения 👇
            </button>
          </div>
          <div className="social-links">
            {profileConfig.socials.map((social, idx) => (
              <a key={idx} href={social.link} className="btn-social" target="_blank" rel="noopener noreferrer">
                {social.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery-section" ref={galleryRef}>
        <h2>{profileConfig.galleryHeading}</h2>
        <div className="gallery-grid">
          {profileConfig.items.map((item, idx) => (
            <GalleryItem 
              key={idx} 
              src={item.src} 
              caption={item.caption} 
              onOpenLightbox={(src, caption) => setLightbox({ isOpen: true, src, caption })}
            />
          ))}
        </div>
      </section>

      {/* РАЗДЕЛ С КАРТОЙ: Кастомный виджет Яндекс Карты ВДНХ */}
      <section className="map-section">
        <h2>Мой район — ВДНХ</h2>
        <div className="map-wrapper">
          <div style={{ position: "relative", overflow: "hidden" }}>
            <a 
              href="https://yandex.ru/maps/213/moscow/?utm_medium=mapframe&utm_source=maps" 
              style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "0px" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Москва
            </a>
            <a 
              href="https://yandex.ru/maps/213/moscow/stops/station__9858797/?from=SO&ll=37.614967%2C55.828197&tab=overview&utm_medium=mapframe&utm_source=maps&z=13.85" 
              style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "14px" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              ВДНХ — Яндекс Карты
            </a>
            <iframe 
              src="https://yandex.ru/map-widget/v1/?from=SO&ll=37.614967%2C55.828197&masstransit%5BstopId%5D=station__9858797&mode=masstransit&tab=overview&z=13.85" 
              width="100%" 
              height="400" 
              frameBorder="0" 
              allowFullScreen={true} 
              style={{ position: "relative" }}
              title="Яндекс Карта ВДНХ"
            ></iframe>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <h2>Написать мне</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
  <div className="form-group">
    <label>Ваше имя</label>
    {/* Убрали required */}
    <input type="text" value={name} onChange={(e) => setName(e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, ""))} />
  </div>
  
  <div className="form-group">
    <label>Email</label>
    {/* Убрали required */}
    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
  </div>
  
  <div className="form-group">
    <label>Номер телефона</label>
    {/* Убрали required */}
    <input type="text" value={phone} onChange={handlePhoneChange} onFocus={() => !phone && setPhone("+7 ")} placeholder="+7 (___) ___-__-__" />
  </div>
  
  <div className="form-group">
    <label>
      Сообщение <span style={{ fontSize: "0.8rem", opacity: 0.7, fontWeight: "normal", marginLeft: "5px" }}>(Enter — отправить, Shift+Enter — перенос)</span>
    </label>
    {/* Убрали required */}
    <textarea 
      rows="5" 
      value={message} 
      onChange={(e) => setMessage(e.target.value)} 
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          if (formStatus !== "loading" && formStatus !== "success") {
            handleSubmit(e);
          }
        }
      }}
    ></textarea>
  </div>

  <button type="submit" className={`btn-submit ${formStatus === "success" ? "btn-success" : ""}`} disabled={formStatus === "loading" || formStatus === "success"}>
    {formStatus === "idle" && "Отправить сообщение"}
    {formStatus === "loading" && "Отправка..."}
    {formStatus === "success" && "Успешно отправлено! ✓"}
    {formStatus === "error" && "Ошибка отправки"}
  </button>
</form>
      </section>

      {lightbox.isOpen && (
        <Lightbox 
          src={lightbox.src} 
          caption={lightbox.caption} 
          onClose={() => setLightbox({ isOpen: false, src: "", caption: "" })} 
        />
      )}
    </div>
  );
}
