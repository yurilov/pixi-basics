import { Container, Sprite, Loader } from "pixi.js";

export default class Lives extends Container {
  private livesCount: number;
  private gameWidth: number;

  constructor(livesCount: number, gameWidth: number) {
    super();

    this.gameWidth = gameWidth;
    this.livesCount = livesCount;
    this.setup();
  }

  setup(): void {
    for (let index = 0; index < this.livesCount; index++) {
      const heartImg = Loader.shared.resources["heart"].url;

      const heart = Sprite.from(heartImg);
      heart.width = 20;
      heart.height = 20;
      heart.position.x = this.gameWidth - 25 - index * 25;
      heart.position.y = 5;

      this.addChild(heart);
    }
  }

  loseLife(): void {
    this.livesCount -= 1;
    this.children.pop();
  }
}
