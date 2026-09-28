import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
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

function AppContent() {
  const { t, i18n } = useTranslation(); 
  const navigate = useNavigate();
  const location = useLocation();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(true);

  const navItems = [
    { title: t("nav.main"), path: "/" },
    { title: t("nav.school"), path: "/school-study" },
    { title: t("nav.nameChange"), path: "/name-change" },
    { title: t("nav.mirea"), path: "/mirea-study" },
    { title: t("nav.projects"), path: "/projects" },
    { title: t("nav.events"), path: "/events" },
    { title: t("nav.donghua"), path: "/donghua" } 
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

  const startYear = 2026;
  const currentYear = new Date().getFullYear();
  const displayYear = startYear === currentYear ? startYear : `${startYear}–${currentYear}`;

  return (
    <>
      <div className="vector-bg-emulation"></div>
      <div className="eps-shape hexagon-1" style={getShapeStyle(1)}></div>
      <div className="eps-shape hexagon-2" style={getShapeStyle(2)}></div>
      <div className="eps-shape pentagon-1" style={getShapeStyle(3)}></div>

      {/* ФИКСИРОВАННЫЙ ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКОВ В ПРАВОМ ВЕРХНЕМ УГЛУ */}
      <div className="lang-switcher-fixed">
        <button 
          onClick={() => i18n.changeLanguage("ru")} 
          className={`lang-fixed-btn ${i18n.language.startsWith("ru") ? "active" : ""}`}
        >
          RU
        </button>
        <button 
          onClick={() => i18n.changeLanguage("en")} 
          className={`lang-fixed-btn ${i18n.language.startsWith("en") ? "active" : ""}`}
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
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/school-study" element={<SchoolStudyPage schoolData={schoolData} />} />
            <Route path="/name-change" element={<NameChangePage legalData={legalData} />} />
            <Route path="/mirea-study" element={<MireaStudyPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/donghua" element={<DonghuaPage />} /> 
            <Route path="*" element={<MainPage />} />
          </Routes>
        </div>

        <footer className="page-footer">
          <p>© {displayYear} {t("footer.rights")} {t("footer.author")}</p>
        </footer>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
