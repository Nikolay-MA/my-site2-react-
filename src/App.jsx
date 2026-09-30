import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate, Outlet, Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; 
import MainPage from "./components/MainPage";
import SchoolStudyPage from "./components/SchoolStudyPage";
import NameChangePage from "./components/NameChangePage";
import MireaStudyPage from "./components/MireaStudyPage";
import ProjectsPage from "./components/ProjectsPage";
import EventsPage from "./components/EventsPage";
import DonghuaPage from "./components/DonghuaPage"; 
import "./App.css";

// Новый семантический компонент для несуществующих страниц (404)
function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <section className="error-404-section" style={{ textAlign: "center", padding: "100px 20px" }}>
      <h1>404</h1>
      <p>Упс! Страница не найдена или была перемещена.</p>
      <Link to="/" className="btn-primary" style={{ display: "inline-block", marginTop: "20px", textDecoration: "none" }}>
        Вернуться на главную
      </Link>
    </section>
  );
}

function MainLayout() {
  const { t, i18n } = useTranslation(); 
  const navigate = useNavigate();
  const location = useLocation();
  
  const isEn = location.pathname.startsWith("/en");
  const currentLng = isEn ? "en" : "ru";

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (currentLng === "en") {
      document.documentElement.setAttribute("lang", "en");
      document.documentElement.removeAttribute("translate"); 
    } else {
      document.documentElement.setAttribute("lang", "ru");
      document.documentElement.setAttribute("translate", "no");
    }
  }, [currentLng]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (i18n.language !== currentLng) {
      i18n.changeLanguage(currentLng);
    }
  }, [currentLng, i18n]);

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
    const handleScroll = () => {
      if (window.innerWidth > 768) {
        setIsScrollingDown(false);
        return;
      }
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 40) {
        setIsScrollingDown(true);
      } else {
        setIsScrollingDown(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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

  const dynamicSchoolData = {
    title: t("school.schoolName"),
    director: t("school.directorVal"),
    classType: t("school.classType"),
    sports: t("school.sportsList", { returnObjects: true }) || []
  };

  const dynamicLegalData = {
    title: t("nameChange.title"),
    text: t("nameChange.text")
  };

  return (
    <>
      <div className="vector-bg-emulation"></div>
      <div className="eps-shape hexagon-1" style={getShapeStyle(1)}></div>
      <div className="eps-shape hexagon-2" style={getShapeStyle(2)}></div>
      <div className="eps-shape pentagon-1" style={getShapeStyle(3)}></div>

      <header className={`lang-switcher-fixed ${isScrollingDown ? "switcher-hidden" : ""}`}>
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
      </header>

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

        <main className="container">
          <Outlet context={{ schoolData: dynamicSchoolData, legalData: dynamicLegalData }} />
        </main>

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
      <Routes>
        <Route path="/ru" element={<Navigate to="/" replace />} />
        <Route path="/ru/*" element={<Navigate to="/" replace />} />
        
        <Route path="/en" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="school-study" element={<SchoolStudyPageWrapper />} />
          <Route path="name-change" element={<NameChangePageWrapper />} />
          <Route path="mirea-study" element={<MireaStudyPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="donghua" element={<DonghuaPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="school-study" element={<SchoolStudyPageWrapper />} />
          <Route path="name-change" element={<NameChangePageWrapper />} />
          <Route path="mirea-study" element={<MireaStudyPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="donghua" element={<DonghuaPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

import { useOutletContext } from "react-router-dom";

function SchoolStudyPageWrapper() {
  const { schoolData } = useOutletContext();
  return <SchoolStudyPage schoolData={schoolData} />;
}

function NameChangePageWrapper() {
  const { legalData } = useOutletContext();
  return <NameChangePage legalData={legalData} />;
}
