// timeline.js
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelector(".cards");
  const items = cards.querySelectorAll("li");

  // Set CSS custom property for number of items
  cards.style.setProperty("--items", items.length);

  // Set index for each <li> so the rotation works correctly
  items.forEach((li, index) => {
    li.style.setProperty("--i", index);

    // Dynamically create CSS rule for checked item
    const style = document.createElement("style");
    style.textContent = `
      .cards:has(li:nth-child(${index + 1}) > input:checked) { --index: ${index}; }
    `;
    document.head.appendChild(style);
  });
});
