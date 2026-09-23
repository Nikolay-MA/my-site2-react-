import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import MainPage from "./components/MainPage";
import SchoolStudyPage from "./components/SchoolStudyPage";
import NameChangePage from "./components/NameChangePage";
import MireaStudyPage from "./components/MireaStudyPage";
import ProjectsPage from "./components/ProjectsPage";
import EventsPage from "./components/EventsPage";
import "./App.css";

const navItems = [
  { title: "Главная страница", path: "/" },
  { title: "Учеба в школе", path: "/school-study" },
  { title: "Смена фамилии", path: "/name-change" },
  { title: "Учеба в МИРЭА", path: "/mirea-study" },
  { title: "Проекты", path: "/projects" },
  { title: "События", path: "/events" }
];

const schoolData = {
  title: "Школа №1415 «Останкино»",
  director: "Пономарев Алексей Леонидович",
  classType: "Физико-математический класс (10–11 классы)",
  sports: ["Самбо (9–10 классы)", "Футбол", "Карате"]
};

const legalData = {
  title: "Процесс смены фамилии",
  text: "Так как мой отец — Команин Андрей Николаевич, в будущем меня будут звать Команиным Николаем Андреевичем. Чтобы решить этот вопрос, летом 2026 года Андрей подал заявление в суд, расположенный в нашем районе, чтобы я смог официально изменить фамилию и отчество."
};

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(true);

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
  return (
    <>
      {/* ФОН ОСТАЛСЯ ЗДЕСЬ И НЕ ПЕРЕНОСИТСЯ */}
      <div className="vector-bg-emulation"></div>
      <div className="eps-shape hexagon-1" style={getShapeStyle(1)}></div>
      <div className="eps-shape hexagon-2" style={getShapeStyle(2)}></div>
      <div className="eps-shape pentagon-1" style={getShapeStyle(3)}></div>

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
            <Route path="*" element={<MainPage />} />
          </Routes>
        </div>

        <footer className="page-footer">
          <p>© {new Date().getFullYear()} Защищено авторскими правами. Маслов Николай Александрович</p>
        </footer>
      </div>
    </>
  );
}

// Корневой экспорт приложения с фиксированным базовым путем для вашего репозитория GitHub Pages
export default function App() {
  return (
    <BrowserRouter basename="/my-site2-react-/">
      <AppContent />
    </BrowserRouter>
  );
}
