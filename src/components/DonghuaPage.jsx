import React, { useState } from "react";

// Импортируем локальные изображения по их английским названиям
import soulLand1Img from "./Фото/soulLand1.webp";
import soulLand2Img from "./Фото/soulLand2.jpg";
import btthImg from "./Фото/btth.jpg";
import throneOfSealImg from "./Фото/throneOfSeal.webp";
import mortalJourneyImg from "./Фото/mortalJourney.jpg";

const donghuaData = [
  {
    id: "soul-land-1",
    rank: "Топ-1",
    title: "Боевой Континент",
    sub: "Soul Land (Douluo Dalu)",
    status: "Завершён (263 сер.)",
    tags: "Сёнен / Фэнтези / Перерождение",
    rating: "9.5",
    img: soulLand1Img,
    desc: "Легендарная история Тан Саня, ученика внешней школы клана Тан, который перерождается в загадочном мире Боевого Континента. Здесь нет магии и боевых искусств в привычном понимании, но каждый человек обладает врожденным Духом, который можно культивировать. Пройдя через суровые испытания, Тан Сань основывает свою команду «Семь Монстров Шрек» и начинает восхождение к божественному престолу.",
    myOpinion: "Моя самая первая дунхуа, которая навсегда останется в сердце! Потрясающее развитие Тан Саня, шикарная романтическая линия с Сяо Ву и безумно эпичный финал «Битвы Богов». С этого тайтла началась моя любовь к китайской 3D-анимации.",
    watchLinks: [
      { label: "Иви", url: "https://www.ivi.ru/watch/boevoj-kontinent-anime" },
      { label: "Кинопоиск", url: "https://hd.kinopoisk.ru/film/9f6f18c7073d4803b71ba1aca69ad3fb" },
      { label: "VK Видео (Фильм)", url: "https://vkvideo.ru/video-217052164_456240813" }
    ]
  },
  {
    id: "soul-land-2",
    rank: "Топ-1 (Сиквел)",
    title: "Боевой континент 2: Непревзойдённый клан Тан",
    sub: "Douluo Dalu II: Jueshi Tangmen",
    status: "Выходит новый сезон",
    tags: "Техномагия / Боевые искусства",
    rating: "9.6",
    img: soulLand2Img,
    desc: "Продолжение культовой вселенной спустя 10 000 лет. Прежний Клан Тан увядает, а мир захлестнул технологический прогресс духовных орудий. Главный герой Хо Юйхао, сирота со слабым телом, но уникальным Духом Духовных Глаз, поступает в академию Шрек, чтобы вернуть Клану Тан былое величие и изменить устоявшиеся законы континента.",
    myOpinion: "Достойное продолжение великой вселенной. Эпоха духовных орудий внесла крутое разнообразие, а Хо Юйхао — очень интересный и глубокий персонаж с непростой судьбой.",
    watchLinks: [
      { label: "Иви", url: "https://www.ivi.ru/watch/boevoj-kontinent-2-neprevzojdyonnyij-klan-tan" },
      { label: "Кинопоиск", url: "https://hd.kinopoisk.ru/film/2fbc67b4c5b343bab3dc9fac8d493ce7" }
    ]
  },
  {
    id: "battle-through-the-heavens",
    rank: "Топ-2",
    title: "Расколотая битвой синева небес",
    sub: "Battle Through the Heavens",
    status: "Выходит / Онгоинг",
    tags: "16+ / Китай / Аниме / Фэнтези / Приключения",
    rating: "8.7",
    img: btthImg,
    desc: "История молодого гения Сяо Яня, который внезапно теряет все свои силы и становится посмешищем для клана, а его помолвка с невестой разрывается. Причиной угасания таланта оказывается дух великого мастера, запертый в фамильном кольце. Став учеником этого духа, Сяо Янь начинает тернистый путь тренировок, чтобы восстановить свою честь, усовершенствовать редкое пламя и достичь небывалых высот мастерства.",
    myOpinion: "Экшен и динамика боев здесь одни из лучших в индустрии. Годовой сериал (Three-Year Agreement и далее) поднял планку качества графики на нереальный уровень. Сюжет держит в постоянном напряжении!",
    watchLinks: [
      { label: "Анистар", url: "https://yandex.ru/search/?text=%D0%B0%D0%BD%D0%B8%D1%81%D1%82%D0%B0%D1%80" },
      { label: "VK Видео (Shanteau Store)", url: "https://vkvideo.ru/playlist/-24440848_54694294/season_undefined" }
    ]
  },
  {
    id: "throne-of-seal",
    rank: "Топ-3",
    title: "Трон, отмеченный богом",
    sub: "Throne of Seal",
    status: "8 сезонов (2022-2026)",
    tags: "16+ / Китай / Аниме / Фэнтези / Приключения",
    rating: "8.7",
    img: throneOfSealImg,
    desc: "В мире, где человечество оказалось на пороге полного уничтожения под натиском шести великих Владык Демонов, основываются шесть оборонительных Храмов. Чтобы спасти свою мать, юный и благородный Лон Хаочэнь вступает в Храм Рыцарей. Обладая невероятными врожденными способностями света, он преодолевает сложнейшие испытания ради признания Божественного Трона.",
    myOpinion: "Атмосфера рыцарства и темного фэнтези выполнена шикарно. Связь Хаочэня с его боевыми товарищами и самопожертвование ради человечества вызывают сильные эмоции.",
    watchLinks: [
      { label: "Иви", url: "https://www.ivi.ru/watch/tron-otmechennyij-bogom" } // Добавлена ссылка Иви
    ]
  },
  {
    id: "a-mortal-journey",
    rank: "Топ-3 (Разделяет место)",
    title: "Путешествие к бессмертию",
    sub: "Fan Ren Xiu Xian Chuan",
    status: "Выходит / Онгоинг",
    tags: "Реалистичное сянься / Приключения",
    rating: "9.5",
    img: mortalJourneyImg,
    desc: "Эталонный представитель жанра прагматичной культивации. Обычный деревенский парень Хань Ли, не имея знатного происхождения или выдающегося врожденного дара, волей случая становится учеником в затворнической секте. В мире, где за бессмертие платят предательством и жестокостью, Хань Ли выживает благодаря исключительной осторожности, хладноверию и стратегическому мышлению.",
    myOpinion: "Я прочитал всю новеллу. Хань Ли — это главный герой он умный, хитрый, смелый и райковый парень, а главное он крайне осторожен. Иногда чтобы сорвать куш он обманывал всех, но при этом не причинял никому вреда. Он чует каждый раз когда ему хотят воткнуть нож в спину, что случалось не раз. На него постоянно охотиться не добросовестные люди, но им не удается это сделать. Это произведение о том как Хань Ли идет к бессмертию, убивая плохих и грабя их, он развивается. Кушает пилюли и становиться сильнее, но чтобы их добыть он идет в рискованные приключения, рискуя жизнью. Немного спойлеров. Он берет несколько учеников и находит жену. Он несколько раз регрессировал в своем развитии для интересности сюжета.",
    watchLinks: [
      { label: "Иви", url: "https://www.ivi.ru/watch/puteshestvie-k-bessmertiyu" }, // Добавлена ссылка Иви
      { label: "Анистар", url: "https://yandex.ru/search/?text=%D0%B0%D0%BD%D0%B8%D1%81%D1%82%D0%B0%D1%80" }
    ]
  }
];
export default function DonghuaPage() {
  const [expandedCards, setExpandedCards] = useState({});
  const [activeTabs, setActiveTabs] = useState({});

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
          <h1>Моё увлечение</h1>
          <p className="bio">
            Я увлекаюсь китайскими 3D дунхуа, слежу за выпуском новых серий. Китайская анимация привлекает меня потрясающей динамикой боев, проработанными мирами культивации, красивой графикой и глубокой философией боевых искусств.
          </p>
        </div>
      </section>

      <section className="info-section-block">
        <h2>Мой личный ТОП и любимые вселенные</h2>
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
                      Описание
                    </button>
                    <button 
                      onClick={() => setTab(anime.id, "opinion")}
                      className={`btn-social donghua-tab-btn ${currentTab === "opinion" ? "tab-active" : ""}`}
                    >
                      Моё мнение
                    </button>
                  </div>

                  <p 
                    className="donghua-description-p" 
                    style={{ maxHeight: isExpanded ? "1000px" : "80px" }}
                  >
                    {currentTab === "desc" ? anime.desc : anime.myOpinion}
                    {!isExpanded && <span className="donghua-text-fade-overlay"></span>}
                  </p>

                  <button 
                    onClick={() => toggleExpand(anime.id)}
                    className="btn-primary donghua-btn-more"
                  >
                    {isExpanded ? "Свернуть" : "Подробнее"}
                  </button>

                  {anime.watchLinks && anime.watchLinks.length > 0 && (
                    <div className="donghua-watch-section">
                      <span className="donghua-watch-title">Смотреть тайтл:</span>
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
