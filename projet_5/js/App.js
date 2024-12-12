import BaseApp from "./BaseApp";
import Particle from "./Particle";

export default class App extends BaseApp {
  constructor() {
    super();
    this.letter = [];
    this.audio = new Audio("flip.mp3"); // Charger le son

    // Ajoute une particule à chaque mouvement de souris
    document.addEventListener("mousemove", (event) => {
      for (let i = 0; i < 3; i++) {
        const x = event.clientX;
        const y = event.clientY;
        const particule = new Particle(x, y);
        this.letter.push(particule);
      }
    });

    // Change la lettre des particules à chaque clic et joue le son
    document.addEventListener("click", () => {
      const lettresPossibles = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const nouvelleLettre =
        lettresPossibles[Math.floor(Math.random() * lettresPossibles.length)];

      this.letter.forEach((particule) => {
        particule.changerLettre(nouvelleLettre);
      });

      this.audio.currentTime = 0; // Réinitialiser le son
      this.audio.play(); // Jouer le son
    });

    this.draw();
  }

  draw() {
    // Efface le canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Met à jour et dessine chaque particule
    this.letter.forEach((particule) => {
      particule.update();
      particule.gererBordsEcran();
      particule.limiterVitesse();
      particule.draw(this.ctx);
    });

    // Continue l'animation
    requestAnimationFrame(() => this.draw());
  }
}
