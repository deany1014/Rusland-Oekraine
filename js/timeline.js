function parseDate(dateStr) {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
}

document.addEventListener("DOMContentLoaded", () => {
  const ul = document.querySelector(".cards");
  if (!ul) return;

  fetch("../static/data/timeline.json")
    .then(response => response.json())
    .then(timelineData => {
      // Sorteren op datum (oud → nieuw)
      const sorted = timelineData.sort((a, b) => parseDate(a.date) - parseDate(b.date));

      // Bouw de <li> elementen
      ul.innerHTML = "";
      sorted.forEach((item, i) => {
        const li = document.createElement("li");
        li.style.setProperty("--i", i);

      li.innerHTML = `
        <input type="radio" id="item-${i}" name="gallery-item" ${i === 0 ? "checked" : ""}>
        <label for="item-${i}">${item.date}</label>
        <h2>${item.title}</h2>
        <p>${item.description}<br><a href="${item.source}" target="_blank">Bron</a></p>
        ${item.image ? `<img src="${item.image}" alt="${item.title}" class="timeline-image">` : ""}
      `;

        ul.appendChild(li);
      });

      // --- Pas CSS custom properties toe na het toevoegen ---
      const items = ul.querySelectorAll("li");
      ul.style.setProperty("--items", items.length);

      items.forEach((li, index) => {
        li.style.setProperty("--i", index);

        const style = document.createElement("style");
        style.textContent = `
          .cards:has(li:nth-child(${index + 1}) > input:checked) { --index: ${index}; }
        `;
        document.head.appendChild(style);
      });
    })
    .catch(err => console.error("Fout bij laden van timeline.json:", err));
});
