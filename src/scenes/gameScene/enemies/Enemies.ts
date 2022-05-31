import { Container, Sprite, Loader } from "pixi.js";

export default class Enemies extends Container {
  private enemyCount: number;
  private gameHeight: number;

  constructor(enemyCount: number, gameHeight: number) {
    super();

    this.gameHeight = gameHeight;

    this.enemyCount = enemyCount;

    this.setup();
  }

  setup(): void {
    for (let index = 0; index < this.enemyCount; index++) {
      const heightMultiplier = Math.random() * 0.5;
      const enemyImg = Loader.shared.resources["enemy"].url;

      const enemy = Sprite.from(enemyImg);
      enemy.position.x = index * 65;
      enemy.position.y = this.gameHeight * heightMultiplier;
      this.addChild(enemy);
    }
  }
}
