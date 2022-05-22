const { Container, Sprite } = PIXI;

export default class Enemies extends Container {
  #enemyCount;
  #gameWidth;
  #gameHeight;
  #imgPath;

  constructor(enemyCount, gameWidth, gameHeight, imgPath) {
    super();

    this.#gameWidth = gameWidth;
    this.#gameHeight = gameHeight;

    this.#enemyCount = enemyCount;
    this.#imgPath = imgPath;

    this.setup();
  }

  setup() {
    for (let index = 0; index < this.#enemyCount; index++) {
      const heightMultiplier = Math.random() * 0.5;
      const enemy = Sprite.from(this.#imgPath);
      enemy.position.x = index * 65;
      enemy.position.y = this.#gameHeight * heightMultiplier;
      this.addChild(enemy);
    }
  }
}
