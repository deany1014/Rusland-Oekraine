// Canvas achtergrond met interactief grid
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

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let x = 0; x < canvas.width; x += gridSize) {
    for (let y = 0; y < canvas.height; y += gridSize) {
      // afstand tot muis berekenen
      let dx = mouse.x - x;
      let dy = mouse.y - y;
      let dist = Math.sqrt(dx*dx + dy*dy);
      let alpha = Math.min(0.3, 1 / (dist / 50 + 1));

      ctx.strokeStyle = `rgba(255, 213, 79, ${alpha})`; // lichtgele lijnen
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + gridSize, y);
      ctx.lineTo(x + gridSize, y + gridSize);
      ctx.lineTo(x, y + gridSize);
      ctx.closePath();
      ctx.stroke();
    }
  }

  requestAnimationFrame(drawGrid);
}

drawGrid();