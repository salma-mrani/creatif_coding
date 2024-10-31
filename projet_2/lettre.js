export default class lettre {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    const letters = "CREATIF CODING";
    this.text = letters[Math.floor(Math.random() * letters.length)];
  }

  update() {
    const letters = "CREATIF CODING";
    this.text = letters[Math.floor(Math.random() * letters.length)];
  }

  draw(context) {
    context.fillText(this.text, this.x, this.y);
  }
}
