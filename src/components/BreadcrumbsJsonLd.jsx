import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Компонент автоматического внедрения микроразметки BreadcrumbList (JSON-LD)
 * @param {Array} items - Массив элементов цепочки: [{ name: "Имя", path: "/путь" }]
 */
export default function BreadcrumbsJsonLd({ items = [] }) {
  const location = useLocation();

  useEffect(() => {
    if (!items || items.length === 0) return;

    // Базовый URL твоего сайта
    const baseUrl = window.location.origin;

    // Строим структуру Schema.org
    const jsonLdData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": item.name,
        // Для последнего элемента URL указывать необязательно, но для промежуточных — строго абсолютный путь
        "item": item.path ? `${baseUrl}${item.path}` : `${baseUrl}${location.pathname}`
      }))
    };

    // Создаем или обновляем тег скрипта в head
    const scriptId = "breadcrumbs-jsonld";
    let script = document.getElementById(scriptId);
    
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    script.text = JSON.stringify(jsonLdData);

    // Удаляем скрипт при размонтировании страницы, чтобы разметка не дублировалась
    return () => {
      const currentScript = document.getElementById(scriptId);
      if (currentScript) {
        currentScript.remove();
      }
    };
  }, [items, location.pathname]);

  return null; // Компонент ничего визуально не рендерит, только наполняет метаданные
}
