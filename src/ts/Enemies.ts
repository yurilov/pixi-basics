import { Container, Sprite } from "pixi.js";

export default class Enemies extends Container {
  private enemyCount: number;
  private gameHeight: number;
  private imgPath: string;

  constructor(enemyCount: number, gameHeight: number, imgPath: string) {
    super();

    this.gameHeight = gameHeight;

    this.enemyCount = enemyCount;
    this.imgPath = imgPath;

    this.setup();
  }

  setup(): void {
    for (let index = 0; index < this.enemyCount; index++) {
      const heightMultiplier = Math.random() * 0.5;
      const enemy = Sprite.from(this.imgPath);
      enemy.position.x = index * 65;
      enemy.position.y = this.gameHeight * heightMultiplier;
      this.addChild(enemy);
    }
  }
}
