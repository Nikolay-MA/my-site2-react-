import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, useParams, Navigate, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next"; 
import MainPage from "./components/MainPage";
import SchoolStudyPage from "./components/SchoolStudyPage";
import NameChangePage from "./components/NameChangePage";
import MireaStudyPage from "./components/MireaStudyPage";
import ProjectsPage from "./components/ProjectsPage";
import EventsPage from "./components/EventsPage";
import DonghuaPage from "./components/DonghuaPage"; 
import "./App.css";

const schoolData = {
  title: "Школа №1415 «Останкино»",
  director: "Пономарев Алексей Леонидович",
  classType: "Физико-математический класс (10–11 классы)",
  sports: ["Самбо (9–10 классы)", "Футбол", "Карате"]
};

const legalData = {
  title: "Процесс смены фамилии",
  text: "Так как мой отец — Команин Андрей Николаевич, в будущем меня будут звать Команиным Николаем Андреевичем. Чтобы решить этот вопрос, летом 2026 года Андрей подал заявление в суд, расположенный в нашем районе, чтобы я смог официально изменить фамилию и отчество. Я увлекаюсь китайскими 3D дунхуа"
};

function MainLayout() {
  const { t, i18n } = useTranslation(); 
  const navigate = useNavigate();
  const location = useLocation();
  
  // Определяем текущий язык на основе URL
  const isEn = location.pathname.startsWith("/en");
  const currentLng = isEn ? "en" : "ru";

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(true);
  
  // Состояние для темной темы (по умолчанию считываем из localStorage, если сохраняли)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Эффект для динамического добавления/удаления класса на body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Синхронизируем i18n с URL
  useEffect(() => {
    if (i18n.language !== currentLng) {
      i18n.changeLanguage(currentLng);
    }
  }, [currentLng, i18n]);

  // Функция для генерации правильного пути с учетом языка
  const getLocalizedPath = (path) => {
    if (currentLng === "ru") return path;
    return `/en${path === "/" ? "" : path}`;
  };

  const navItems = [
    { title: t("nav.main"), path: getLocalizedPath("/") },
    { title: t("nav.school"), path: getLocalizedPath("/school-study") },
    { title: t("nav.nameChange"), path: getLocalizedPath("/name-change") },
    { title: t("nav.mirea"), path: getLocalizedPath("/mirea-study") },
    { title: t("nav.projects"), path: getLocalizedPath("/projects") },
    { title: t("nav.events"), path: getLocalizedPath("/events") },
    { title: t("nav.donghua"), path: getLocalizedPath("/donghua") } 
  ];

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5
      });
    };
    const handleMouseLeave = () => setMousePos({ x: 0, y: 0 });

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isDesktop]);

  const getShapeStyle = (factor) => {
    if (!isDesktop) return { display: "none" };
    return {
      transform: `translate(${mousePos.x * factor * 15}px, ${mousePos.y * factor * 15}px) scale(1.05)`
    };
  };

  const handleLangChange = (newLng) => {
    if (newLng === currentLng) return;
    
    let newPath = location.pathname;
    if (newLng === "en") {
      newPath = `/en${newPath}`;
    } else {
      newPath = newPath.replace(/^\/en/, "");
      if (newPath === "") newPath = "/";
    }
    navigate(newPath);
  };

  const startYear = 2026;
  const currentYear = new Date().getFullYear();
  const displayYear = startYear === currentYear ? startYear : `${startYear}–${currentYear}`;

  return (
    <>
      <div className="vector-bg-emulation"></div>
      <div className="eps-shape hexagon-1" style={getShapeStyle(1)}></div>
      <div className="eps-shape hexagon-2" style={getShapeStyle(2)}></div>
      <div className="eps-shape pentagon-1" style={getShapeStyle(3)}></div>

      {/* Панель управления: переключатель темы + языки */}
      <div className="lang-switcher-fixed">
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)} 
          className="theme-toggle-btn"
          title={isDarkMode ? "Включить светлую тему" : "Включить темную тему"}
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>
        <button 
          onClick={() => handleLangChange("ru")} 
          className={`lang-fixed-btn ${currentLng === "ru" ? "active" : ""}`}
        >
          RU
        </button>
        <button 
          onClick={() => handleLangChange("en")} 
          className={`lang-fixed-btn ${currentLng === "en" ? "active" : ""}`}
        >
          EN
        </button>
      </div>

      <div className="page-wrapper">
        <nav className="top-navigation">
          {navItems.map((nav, idx) => (
            <button 
              key={idx} 
              onClick={() => {
                navigate(nav.path);
                window.scrollTo({ top: 0, behavior: "auto" });
              }} 
              className={`nav-btn ${location.pathname === nav.path ? "active-page-btn" : ""}`}
            >
              {nav.title}
            </button>
          ))}
        </nav>

        <div className="container">
          <Outlet />
        </div>

        <footer className="page-footer">
          <p>© {displayYear} {t("footer.rights")} {t("footer.author")}</p>
        </footer>
      </div>
    </>
  );
}


// Измененная структура путей для предотвращения конфликтов и белого экрана
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Старый редирект с /ru на главный корень без префикса */}
        <Route path="/ru" element={<Navigate to="/" replace />} />
        <Route path="/ru/*" element={<Navigate to="/" replace />} />

        {/* 1. Английская версия (остается с префиксом /en) */}
        <Route path="/en" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="school-study" element={<SchoolStudyPage schoolData={schoolData} />} />
          <Route path="name-change" element={<NameChangePage legalData={legalData} />} />
          <Route path="mirea-study" element={<MireaStudyPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="donghua" element={<DonghuaPage />} />
          <Route path="*" element={<Navigate to="/en" replace />} />
        </Route>

        {/* 2. Русская версия по умолчанию (без префикса) */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="school-study" element={<SchoolStudyPage schoolData={schoolData} />} />
          <Route path="name-change" element={<NameChangePage legalData={legalData} />} />
          <Route path="mirea-study" element={<MireaStudyPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="donghua" element={<DonghuaPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
