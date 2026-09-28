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

  // Исходное мнение на русском языке, сохраненное в коде
  const originalOpinions = {
    "soul-land-1": "Моя самая первая дунхуа, которая навсегда останется в сердце! Потрясающее развитие Тан Саня, шикарная романтическая линия с Сяо Ву и безумно эпичный финал «Битвы Богов». С этого тайтла началась моя любовь к китайской 3D-анимации.",
    "soul-land-2": "Достойное продолжение великой вселенной. Эпоха духовных орудий внесла крутое разнообразие, а Хо Юйхао — очень интересный и глубокий персонаж с непростой судьбой.",
    "battle-through-the-heavens": "Экшен и динамика боев здесь одни из лучших в индустрии. Годовой сериал (Three-Year Agreement и далее) поднял планку качества графики на нереальный уровень. Сюжет держит в постоянном напряжении!",
    "throne-of-seal": "Атмосфера рыцарства и темного фэнтези выполнена шикарно. Связь Хаочэня с его боевыми товарищами и самопожертвование ради человечества вызывают сильные эмоции.",
    "a-mortal-journey": "Я прочитал всю новеллу. Хань Ли — это главный герой он умный, хитрый, смелый и райковый парень, а главное он крайне осторожен. Иногда чтобы сорвать куш он обманывал всех, но при этом не причинял никому вреда. Он чует каждый раз когда ему хотят воткнуть нож в спину, что случалось не раз. На него постоянно охотиться не добросовестные люди, но им не удается это сделать. Это произведение о том как Хань Ли идет к бессмертию, убивая плохих и грабя их, он развивается. Кушает пилюли и становиться сильнее, но чтобы их добыть он идет в рискованные приключения, рискуя жизнью. Немного спойлеров. Он берет несколько учеников и находит жену. Он несколько раз регрессировал в своем развитии для интересности сюжета."
  };

  // Перевод мнения для английской версии
  const translatedOpinions = {
    "soul-land-1": "My very first donghua that will forever remain in my heart! Amazing character development of Tang San, a wonderful romantic storyline with Xiao Wu, and an insanely epic finale of the 'Battle of Gods'. My love for Chinese 3D animation started with this title.",
    "soul-land-2": "A worthy continuation of the great universe. The era of soul tools brought cool variety, and Huo Yuhao is a very interesting and deep character with a complicated destiny.",
    "battle-through-the-heavens": "The action and combat dynamics here are among the best in the industry. The year-long series (Three-Year Agreement and beyond) raised the quality bar of graphics to an unreal level. The plot keeps you in constant tension!",
    "throne-of-seal": "The atmosphere of chivalry and dark fantasy is brilliantly executed. Haochen's bond with his comrades-in-arms and self-sacrifice for the sake of humanity evoke strong emotions.",
    "a-mortal-journey": "I read the whole light novel. Han Li is the main character; he is smart, cunning, brave, and down-to-earth, and most importantly, he is extremely cautious. Sometimes, to hit the jackpot, he deceived everyone, but at the same time did not harm anyone. He senses every time someone wants to stab him in the back, which happened more than once. Dishonest people are constantly hunting him, but they fail. This piece is about how Han Li goes to immortality, killing the bad guys and robbing them, he develops. He consumes pills and becomes stronger, but to get them he goes on risky adventures, risking his life. A few spoilers: he takes several disciples and finds a wife. He regressed several times in his development for the interest of the plot."
  };
  const donghuaData = [
    {
      id: "soul-land-1",
      rank: t("donghua.ranks.sl1"),
      title: t("donghua.titles.sl1"),
      sub: "Soul Land (Douluo Dalu)",
      status: t("donghua.status.completed"),
      tags: t("donghua.tags.sl1"),
      rating: "9.5",
      img: soulLand1Img,
      desc: i18n.language?.startsWith("en")
        ? "The legendary story of Tang San, a disciple of the Tang Sect outer sect, who is reincarnated in the mysterious world of the Soul Land. There is no magic or traditional martial arts here, but everyone possesses an innate Spirit that can be cultivated. Having passed through severe trials, Tang San establishes his team 'Shrek Seven Monsters' and begins his ascent to the divine throne."
        : "Легендарная история Тан Сана, ученика внешней школы клана Тан, который перерождается в загадочном мире Боевого Континента. Здесь нет магии и боевых искусств в привычном понимании, но каждый человек обладает врожденным Духом, который можно культивировать. Пройдя через суровые испытания, Тан Сань основывает свою команду «Семь Монстров Шрек» и начинает восхождение к божественному престолу.",
      watchLinks: [
        { label: "Иви", url: "https://www.ivi.ru/watch/boevoj-kontinent-anime" },
        { label: "Кинопоиск", url: "https://hd.kinopoisk.ru/film/9f6f18c7073d4803b71ba1aca69ad3fb" },
        { label: "VK Видео (Фильм)", url: "https://vkvideo.ru/video-217052164_456240813" }
      ]
    },
    {
      id: "soul-land-2",
      rank: t("donghua.ranks.sl2"),
      title: t("donghua.titles.sl2"),
      sub: "Douluo Dalu II: Jueshi Tangmen",
      status: t("donghua.status.newSeason"),
      tags: t("donghua.tags.sl2"),
      rating: "9.6",
      img: soulLand2Img,
      desc: i18n.language?.startsWith("en")
        ? "Continuation of the cult universe 10,000 years later. The former Tang Sect is declining, and the world is engulfed by the technological progress of soul tools. The main character, Huo Yuhao, an orphan with a weak body but a unique Spirit of Spirit Eyes, enters the Shrek Academy to restore the Tang Sect to its former glory and change the established laws of the continent."
        : "Продолжение культовой вселенной спустя 10 000 лет. Прежний Клан Тан увядает, а мир захлестнул технологический прогресс духовных орудий. Главный герой Хо Юйхао, сирота со слабым телом, но уникальным Духом Духовных Глаз, поступает в академию Шрек, чтобы вернуть Клану Тан былое величие и изменить устоявшиеся законы континента.",
      watchLinks: [
        { label: "Иви", url: "https://www.ivi.ru/watch/boevoj-kontinent-2-neprevzojdyonnyij-klan-tan" },
        { label: "Кинопоиск", url: "https://hd.kinopoisk.ru/film/2fbc67b4c5b343bab3dc9fac8d493ce7" }
      ]
    },
    {
      id: "battle-through-the-heavens",
      rank: t("donghua.ranks.btth"),
      title: t("donghua.titles.btth"),
      sub: "Battle Through the Heavens",
      status: t("donghua.status.ongoing"),
      tags: t("donghua.tags.btth"),
      rating: "8.7",
      img: btthImg,
      desc: i18n.language?.startsWith("en")
        ? "The story of a young genius, Xiao Yan, who suddenly loses all his powers and becomes a laughingstock for the clan, and his engagement to his fiancée is broken. The reason for the fading of talent turns out to be the spirit of a great master trapped in a family ring. Becoming a disciple of this spirit, Xiao Yan begins a thorny path of training to restore his honor, perfect a rare flame, and reach unprecedented heights of mastery."
        : "История молодого гения Сяо Яня, который внезапно теряет все свои силы и становится посмешищем для клана, а его помолвка с невестой разрывается. Причиной угасания таланта оказывается дух великого мастера, запертый в фамильном кольце. Став учеником этого духа, Сяо Янь начинает тернистый путь тренировок, чтобы восстановить свою честь, усовершенствовать редкое пламя и достичь небывалых высот мастерства.",
      watchLinks: [
        { label: "Анистар", url: "https://yandex.ru/search/?text=%D0%B0%D0%BD%D0%B8%D1%81%D1%82%D0%B0%D1%80" },
      { label: "VK Видео (Shanteau Store)", url: "https://vkvideo.ru/playlist/-24440848_54694294" }
      ]
    },
    {
      id: "throne-of-seal",
      rank: t("donghua.ranks.tos"),
      title: t("donghua.titles.tos"),
      sub: "Throne of Seal",
      status: t("donghua.status.seasons"),
      tags: t("donghua.tags.tos"),
      rating: "8.7",
      img: throneOfSealImg,
      desc: i18n.language?.startsWith("en")
        ? "In a world where humanity finds itself on the brink of total destruction under the onslaught of the six great Demon Gods, six defensive Temples are founded. To save his mother, young and noble Long Haochen joins the Knight Temple. Possessing incredible innate light abilities, he overcomes the most difficult challenges for the recognition of the Divine Throne."
        : "В мире, где человечество оказалось на пороге полного уничтожения под натиском шести великих Владык Демонов, основываются шесть оборонительных Храмов. Чтобы спасти свою мать, юный и благородный Лон Хаочэнь вступает в Храм Рыцарей. Обладая невероятными врожденными способностями света, он преодолевает сложнейшие испытания ради признания Божественного Трона.",
      watchLinks: [
        { label: "Иви", url: "https://www.ivi.ru/watch/tron-otmechennyij-bogom" }
      ]
    },
    {
      id: "a-mortal-journey",
      rank: t("donghua.ranks.mj"),
      title: t("donghua.titles.mj"),
      sub: "Fan Ren Xiu Xian Chuan",
      status: t("donghua.status.ongoing"),
      tags: t("donghua.tags.mj"),
      rating: "9.5",
      img: mortalJourneyImg,
      desc: i18n.language?.startsWith("en")
        ? "A benchmark representative of the pragmatic cultivation genre. An ordinary village boy, Han Li, having no noble origin or outstanding innate gift, by chance becomes a disciple in a secluded sect. In a world where one pays with betrayal and cruelty for immortality, Han Li survives thanks to exceptional caution, cold-bloodedness, and strategic thinking."
        : "Эталонный представитель жанра прагматичной культивации. Обычный деревенский парень Хань Ли, не имея знатного происхождения или выдающегося врожденного дара, волей случая становится учеником в затворнической секте. В мире, где за бессмертие платят предательством и жестокостью, Хань Ли выживает благодаря исключительной осторожности, хладноверию и стратегическому мышлению.",
      watchLinks: [
        { label: "Иви", url: "https://www.ivi.ru/watch/puteshestvie-k-bessmertiyu" }, // Добавлена ссылка Иви
      { label: "Анистар", url: "https://yandex.ru/search/?text=%D0%B0%D0%BD%D0%B8%D1%81%D1%82%D0%B0%D1%80" }
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
                    {currentTab === "desc" 
                      ? anime.desc 
                      : (i18n.language?.startsWith("en") ? translatedOpinions[anime.id] : originalOpinions[anime.id])
                    }
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
