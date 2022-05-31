import { Text } from "pixi.js";

export default class LoseField extends Text {
  private gameWidth;
  private gameHeight;

  constructor(
    gameWidth: number,
    gameHeight: number,
    style: object,
    score: number
  ) {
    super(`You lost. Final score is: ${score}`, style);

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.setup();
  }

  setup(): void {
    this.position.x = this.gameWidth / 2 - this.width / 2;
    this.position.y = this.gameHeight / 2 - this.height / 2;
  }

  update() {}
}
