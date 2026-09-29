import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import soulLand1Img from "./Фото/soulLand1.webp";
import soulLand2Img from "./Фото/soulLand2.jpg";
import btthImg from "./Фото/btth.jpg";
import throneOfSealImg from "./Фото/throneOfSeal.webp";
import mortalJourneyImg from "./Фото/mortalJourney.jpg";

export default function DonghuaPage() {
  const { t, i18n } = useTranslation();
  const [expandedCards, setExpandedCards] = useState({});
  const [activeTabs, setActiveTabs] = useState({});

  const isEn = i18n.language?.startsWith("en");

  const donghuaData = [
    {
      id: "sl1",
      rank: t("donghua.ranks.sl1"),
      title: t("donghua.titles.sl1"),
      sub: "Soul Land (Douluo Dalu)",
      status: t("donghua.status.completed"),
      tags: t("donghua.tags.sl1"),
      rating: "9.5",
      img: soulLand1Img,
      desc: t("donghua.descriptions.sl1"),
      opinion: t("donghua.opinions.sl1"),
      watchLinks: [
        { label: isEn ? "Ivi Cinema" : "Иви", url: "https://ivi.ru" },
        { label: isEn ? "Kinopoisk" : "Кинопоиск", url: "https://kinopoisk.ru" },
        { label: isEn ? "VK Video (Movie)" : "VK Видео (Фильм)", url: "https://vkvideo.ru" }
      ]
    },
    {
      id: "sl2",
      rank: t("donghua.ranks.sl2"),
      title: t("donghua.titles.sl2"),
      sub: "Douluo Dalu II: Jueshi Tangmen",
      status: t("donghua.status.newSeason"),
      tags: t("donghua.tags.sl2"),
      rating: "9.6",
      img: soulLand2Img,
      desc: t("donghua.descriptions.sl2"),
      opinion: t("donghua.opinions.sl2"),
      watchLinks: [
        { label: isEn ? "Ivi Cinema" : "Иви", url: "https://ivi.ru" },
        { label: isEn ? "Kinopoisk" : "Кинопоиск", url: "https://kinopoisk.ru" }
      ]
    },
    {
      id: "btth",
      rank: t("donghua.ranks.btth"),
      title: t("donghua.titles.btth"),
      sub: "Battle Through the Heavens",
      status: t("donghua.status.ongoing"),
      tags: t("donghua.tags.btth"),
      rating: "8.7",
      img: btthImg,
      desc: t("donghua.descriptions.btth"),
      opinion: t("donghua.opinions.btth"),
      watchLinks: [
        { label: isEn ? "Anistar Portal" : "Анистар", url: "https://yandex.ru" },
        { label: isEn ? "VK Video (Shanteau)" : "VK Видео (Shanteau Store)", url: "https://vkvideo.ru" }
      ]
    },
    {
      id: "tos",
      rank: t("donghua.ranks.tos"),
      title: t("donghua.titles.tos"),
      sub: "Throne of Seal",
      status: t("donghua.status.seasons"),
      tags: t("donghua.tags.tos"),
      rating: "8.7",
      img: throneOfSealImg,
      desc: t("donghua.descriptions.tos"),
      opinion: t("donghua.opinions.tos"),
      watchLinks: [
        { label: isEn ? "Ivi Cinema" : "Иви", url: "https://ivi.ru" }
      ]
    },
    {
      id: "mj",
      rank: t("donghua.ranks.mj"),
      title: t("donghua.titles.mj"),
      sub: "Fan Ren Xiu Xian Chuan",
      status: t("donghua.status.ongoing"),
      tags: t("donghua.tags.mj"),
      rating: "9.5",
      img: mortalJourneyImg,
      desc: t("donghua.descriptions.mj"),
      opinion: t("donghua.opinions.mj"),
      watchLinks: [
        { label: isEn ? "Ivi Cinema" : "Иви", url: "https://ivi.ru" },
        { label: isEn ? "Anistar Portal" : "Анистар", url: "https://yandex.ru" }
      ]
    }
  ];

  const toggleExpand = (id) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const setTab = (id, tabType) => {
    setActiveTabs(prev => ({ ...prev, [id]: tabType }));
  };

  return (
    <div className="donghua-page-container">
      <section className="profile-card">
        <div className="profile-info">
          <h1>{t("donghua.title")}</h1>
          <p className="bio">{t("donghua.bio")}</p>
        </div>
      </section>

      <section className="info-section-block">
        <h2>{t("donghua.sectionTitle")}</h2>
        <div className="school-grid-layout" style={{ display: "flex", flexDirection: "column" }}>
          {donghuaData.map((anime) => {
            const isExpanded = expandedCards[anime.id];
            const currentTab = activeTabs[anime.id] || "desc";

            return (
              <div key={anime.id} className="legal-info-card donghua-card-wrapper">
                <span className="anime-badge">{anime.rank}</span>
                
                <div className="donghua-poster-block">
                  <img src={anime.img} alt={anime.title} className="donghua-poster-img" />
                  <div className="donghua-rating-badge">★ {anime.rating}</div>
                </div>

                <div className="donghua-text-content">
                  <h3 className="donghua-title">{anime.title}</h3>
                  <div className="donghua-sub-title">{anime.sub}</div>
                  
                  <div className="donghua-tags-container">
                    <span className="donghua-tag-status">{anime.status}</span>
                    <span className="donghua-tag-genre">{anime.tags}</span>
                  </div>

                  <div className="donghua-tabs-container">
                    <button 
                      onClick={() => setTab(anime.id, "desc")}
                      className={`btn-social donghua-tab-btn ${currentTab === "desc" ? "tab-active" : ""}`}
                    >
                      {t("donghua.tabs.desc")}
                    </button>
                    <button 
                      onClick={() => setTab(anime.id, "opinion")}
                      className={`btn-social donghua-tab-btn ${currentTab === "opinion" ? "tab-active" : ""}`}
                    >
                      {t("donghua.tabs.opinion")}
                    </button>
                  </div>

                  <p 
                    className="donghua-description-p" 
                    style={{ maxHeight: isExpanded ? "1000px" : "80px" }}
                  >
                    {currentTab === "desc" ? anime.desc : anime.opinion}
                    {!isExpanded && <span className="donghua-text-fade-overlay"></span>}
                  </p>

                  <button 
                    onClick={() => toggleExpand(anime.id)}
                    className="btn-primary donghua-btn-more"
                  >
                    {isExpanded ? t("donghua.btnLess") : t("donghua.btnMore")}
                  </button>

                  {anime.watchLinks && anime.watchLinks.length > 0 && (
                    <div className="donghua-watch-section">
                      <span className="donghua-watch-title">{t("donghua.watch")}</span>
                      <div className="donghua-links-inline">
                        {anime.watchLinks.map((link, idx) => (
                          <a 
                            key={idx} 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn-social donghua-link-item"
                          >
                            {link.label} ↗
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
