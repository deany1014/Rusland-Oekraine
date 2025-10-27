function parseDate(dateStr) {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
}

document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector(".timeline-list");
  if (!list) return;

  fetch("../static/data/timeline.json")
    .then(response => response.json())
    .then(timelineData => {
      const sorted = timelineData.sort((a, b) => parseDate(a.date) - parseDate(b.date));

      list.innerHTML = "";

      sorted.forEach((item, index) => {
        const li = document.createElement("li");
        const importance = (item.importance || "standard").toLowerCase();
        const dateObj = parseDate(item.date);
        const isoDate = Number.isNaN(dateObj.getTime()) ? item.date : dateObj.toISOString().split("T")[0];

        li.className = `timeline-item importance-${importance}`;
        li.dataset.position = index % 2 === 0 ? "left" : "right";

        const sourceMarkup = item.source
          ? `<a href="${item.source}" target="_blank" rel="noopener noreferrer" class="timeline-source">Bron</a>`
          : "";

        let importanceLabel = "";
        if (importance === "major") importanceLabel = "Belangrijk moment";
        else if (importance === "minor") importanceLabel = "Context";

        const badgeMarkup = importanceLabel
          ? `<span class="timeline-badge">${importanceLabel}</span>`
          : "";

        const metaSection = [sourceMarkup, badgeMarkup].filter(Boolean).join("");
        const footerMarkup = metaSection ? `<footer class="timeline-footer">${metaSection}</footer>` : "";

        const imageMarkup = item.image
          ? `<figure class="timeline-media">
              <img src="${item.image}" alt="${item.title}" class="timeline-image" loading="lazy">
            </figure>`
          : "";

        li.innerHTML = `
          <article class="timeline-card">
            <header class="timeline-header">
              <time class="timeline-date" datetime="${isoDate}">${item.date}</time>
              <h3 class="timeline-title">${item.title}</h3>
            </header>
            <p class="timeline-description">${item.description}</p>
            ${imageMarkup}
            ${footerMarkup}
          </article>
        `;

        list.appendChild(li);
      });
    })
    .catch(err => console.error("Fout bij laden van timeline.json:", err));
});
