import Square from "./lettre.js";

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext("2d");

let fontSize = 100;

ctx.font = `${fontSize}px grotesque`;
ctx.fillStyle = "green";

const cols = 100;
const rows = 100;
const size = 10;

let squares = [];

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    const x = j * (size * 10);
    const y = i * (size * 10);
    const newSquare = new Square(x, y, size);
    squares.push(newSquare);
  }
}

console.log(squares);

let lastTime = 100; // Pour suivre le dernier moment où l'animation a été mise à jour
let animationSpeed = 1000 / 100; // Durée entre chaque frame en millisecondes (60 fps par défaut)

function animate(timestamp) {
  // Calculer le temps écoulé depuis la dernière frame
  const deltaTime = timestamp - lastTime;

  if (deltaTime > animationSpeed) {
    ctx.clearRect(0, 0, width, height);
    squares.forEach((s) => {
      s.update();
      s.draw(ctx);
    });

    lastTime = timestamp; // Mettre à jour le dernier temps
  }

  requestAnimationFrame(animate);
}

// Pour modifier la vitesse de l'animation (en millisecondes par frame), par exemple 30 fps
animationSpeed = 500 / 10;

requestAnimationFrame(animate);
