import BaseApp from "./BaseApp.js";
import Utils from "./Utils.js";

export default class App extends BaseApp {
  constructor() {
    super();
    this.time = 0;
    this.amplitude = 25;
    this.frequency = 0.015;
    this.angle = 2;
    this.letters = [];
    this.cursorPosition = { x: this.width / 2, y: this.height / 2 }; // Position initiale du curseur

    Utils.loadSVG("letter.svg").then((letterPoints) => {
      this.letter = letterPoints;
      this.addLetter();
      this.animate();
    });

    window.addEventListener("click", () => {
      this.addLetter();
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "s" || event.key === "S") {
        this.removeLetter();
      }
    });

    window.addEventListener("mousemove", (event) => {
      this.cursorPosition.x = event.clientX;
      this.cursorPosition.y = event.clientY;
    });
  }

  getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.3)`; // Opacité de 0.3
  }

  addLetter() {
    this.letters.push({
      points: this.letter,
      angle: 0,
      color: this.getRandomColor(),
    });
  }

  removeLetter() {
    if (this.letters.length > 0) {
      this.letters.pop();
    }
  }

  animate() {
    this.time += 0.03;
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.letters.forEach((letter, index) => {
      this.ctx.save();

      letter.angle += 0.01 * (index + 1);

      this.ctx.translate(this.cursorPosition.x, this.cursorPosition.y);
      this.ctx.rotate(letter.angle);

      const scale = 0.5;
      this.ctx.scale(scale, scale);

      this.ctx.fillStyle = letter.color;
      this.ctx.beginPath();
      letter.points.forEach(this.drawPath.bind(this));
      this.ctx.fill();

      this.ctx.restore();
    });

    requestAnimationFrame(this.animate.bind(this));
  }

  drawPath(path) {
    for (let i = 0; i < path.length; i++) {
      const point = path[i];
      const x = point.x - this.width / 2; // Centre de rotation
      const y = point.y - this.height / 2;

      if (i !== 0) {
        this.ctx.lineTo(x, y);
      } else {
        this.ctx.moveTo(x, y);
      }
    }
  }
}
