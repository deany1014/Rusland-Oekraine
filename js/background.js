// Canvas achtergrond met interactief geanimeerd grid
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const gridSize = 35;
let mouse = { x: 0, y: 0 };
window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function drawGrid(time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const t = time * 0.002; // tijdsfactor voor animatie

  for (let x = 0; x < canvas.width; x += gridSize) {
    for (let y = 0; y < canvas.height; y += gridSize) {
      // afstand tot muis
      let dx = mouse.x - x;
      let dy = mouse.y - y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      // alpha afhankelijk van afstand
      let alpha = Math.min(0.3, 1 / (dist / 50 + 1));

      // subtiele verplaatsing gebaseerd op tijd en afstand
      let offset = Math.sin(t + (x + y) * 0.01) * 2;
      let ox = Math.cos(t + y * 0.05) * 1.5;
      let oy = Math.sin(t + x * 0.05) * 1.5;

      // kleurvariatie in tijd
      const hue = 45 + Math.sin(t + (x + y) * 0.001) * 10; // rond goud/amber
      ctx.strokeStyle = `hsla(${hue}, 100%, 70%, ${alpha})`;

      ctx.beginPath();
      ctx.moveTo(x + ox, y + oy);
      ctx.lineTo(x + gridSize + offset, y + oy);
      ctx.lineTo(x + gridSize + offset, y + gridSize + offset);
      ctx.lineTo(x + ox, y + gridSize + offset);
      ctx.closePath();
      ctx.stroke();
    }
  }

  requestAnimationFrame(drawGrid);
}

requestAnimationFrame(drawGrid);
