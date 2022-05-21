const { Container, Sprite } = PIXI;

export default class Lives extends Container {
  #livesCount;
  #gameWidth;
  #gameHeight;

  constructor(livesCount, gameWidth, gameHeight) {
    super();

    this.#gameWidth = gameWidth;
    this.#gameHeight = gameHeight;

    this.#livesCount = livesCount;
    this.setup();
  }

  setup() {
    for (let index = 0; index < this.#livesCount; index++) {
      const heart = Sprite.from("../resources/heart.png");
      heart.width = 20;
      heart.height = 20;
      heart.position.x = this.#gameWidth - 25 - index * 25;
      heart.position.y = 5;

      this.addChild(heart);
    }
  }

  loseLife() {
    this.#livesCount -= 1;
    this.children.pop();
  }
}
