const { Container, Sprite } = PIXI;

export default class Enemies extends Container {
  #enemyCount;
  #gameWidth;
  #gameHeight;

  constructor(enemyCount, gameWidth, gameHeight) {
    super();

    this.#gameWidth = gameWidth;
    this.#gameHeight = gameHeight;

    this.#enemyCount = enemyCount;
    this.setup();
  }

  setup() {
    for (let index = 0; index < this.#enemyCount; index++) {
      const heightMultiplier = Math.random() * 0.5;
      const enemy = Sprite.from("../resources/enemy.png");
      enemy.position.x = index * 65;
      enemy.position.y = this.#gameHeight * heightMultiplier;
      this.addChild(enemy);
    }
  }
}
