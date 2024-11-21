export default class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    // Vitesse de la particule
    this.vitesseX = 0;
    this.vitesseY = 0;

    // Accélération de la particule
    this.accelerationX = (Math.random() - 0.5) * 0.1;
    this.accelerationY = (Math.random() - 0.5) * 0.1;
    this.vitesseMax = 5;

    // Couleur aléatoire de la particule avec opacité
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const alpha = Math.random().toFixed(2); // Opacité entre 0.01 et 1
    this.couleur = `rgba(${r}, ${g}, ${b}, ${alpha})`;

    // Taille aléatoire pour le texte
    this.taille = Math.random() * 100 + 60; // Taille entre 10px et 40px

    // Lettre initiale
    this.lettre = "S"; // Valeur par défaut
  }

  // Changer la lettre de la particule
  changerLettre(nouvelleLettre) {
    this.lettre = nouvelleLettre;
  }

  // Mettre à jour la position et la vitesse de la particule
  update() {
    this.vitesseX += this.accelerationX;
    this.vitesseY += this.accelerationY;

    this.x += this.vitesseX;
    this.y += this.vitesseY;
  }

  // Limiter la vitesse de la particule
  limiterVitesse() {
    this.vitesseX = Math.min(
      Math.max(this.vitesseX, -this.vitesseMax),
      this.vitesseMax
    );
    this.vitesseY = Math.min(
      Math.max(this.vitesseY, -this.vitesseMax),
      this.vitesseMax
    );
  }

  // Faire réapparaître la particule de l'autre côté si elle sort de l'écran
  gererBordsEcran() {
    if (this.x > window.innerWidth) this.x = 0;
    if (this.x < 0) this.x = window.innerWidth;
    if (this.y > window.innerHeight) this.y = 0;
    if (this.y < 0) this.y = window.innerHeight;
  }

  // Dessiner la particule
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    // Appliquer les propriétés uniques de la particule
    ctx.fillStyle = this.couleur;
    ctx.font = `${this.taille}px impact`; // Taille dynamique pour la particule
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Dessiner la lettre
    ctx.fillText(this.lettre, 0, 0);

    ctx.restore();
  }
}
